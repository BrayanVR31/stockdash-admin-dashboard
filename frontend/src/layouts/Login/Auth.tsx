import {
  Button,
  Flex,
  Field,
  Heading,
  Input,
  Text,
  Link,
  InputGroup,
  Box,
  Spinner,
} from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";
import { FcGoogle } from "react-icons/fc";
import { FiLogIn } from "react-icons/fi";
import {
  useForm,
  SubmitHandler,
  useWatch,
  FormProvider,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthenticationStore } from "@/store/authenticationStore";
import { userSchema, UserInputs } from "./userSchema";
import { useSignIn } from "@/hooks/useAuth";
import { AuthPass, AuthEmail } from "./AuthForm";

export default function LoginPage() {
  const methods = useForm({
    resolver: zodResolver(userSchema),
    mode: "all",
  });
  const { mutate, matchedError, status, isPending } = useSignIn();
  const onSubmit: SubmitHandler<UserInputs> = (user) => {
    console.log(user);
    mutate(user);
  };
  const setIsLogged = useAuthenticationStore((state) => state.setIsLogged);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "error" && matchedError) {
      methods.setError(matchedError.key, {
        message: matchedError.message,
      });
    } else if (status === "success") {
      setIsLogged(true);
      navigate("/dashboard");
    }
  }, [status, methods, setIsLogged, navigate, matchedError]);

  return (
    <FormProvider {...methods}>
      <Flex
        onSubmit={methods.handleSubmit(onSubmit)}
        as="form"
        direction="column"
        align="center"
        w="full"
        maxW="md"
        bg={{
          _light: "white",
          _dark: "gray.800",
        }}
        p={8}
        borderRadius="md"
        boxShadow="lg"
        border="1px solid"
        borderColor={{
          _light: "gray.200",
          _dark: "gray.700",
        }}
      >
        <Flex w="full" justify="flex-end" mb={6}>
          <ColorModeButton />
        </Flex>

        <Heading mb={6} size="lg">
          &#128075; Bienvenido de nuevo
        </Heading>

        <Button w="full" mb={4} variant="outline">
          <FcGoogle />
          Sign in with Google
        </Button>

        <Flex w="full" align="center" my={4}>
          <Box
            borderColor={{
              _light: "gray.300",
              _dark: "gray.600",
            }}
            borderBottom="1px solid"
            flex="1"
          />
          <Text px={2} fontSize="sm" color="gray.500">
            o
          </Text>
          <Box
            borderColor={{
              _light: "gray.300",
              _dark: "gray.600",
            }}
            borderBottom="1px solid"
            flex="1"
          />
        </Flex>
        {/** Email */}
        <AuthEmail />
        {/** Password */}
        <AuthPass />

        <Button
          disabled={isPending}
          type="submit"
          colorPalette="purple"
          w="full"
          mb={4}
        >
          {isPending ? <Spinner size="sm" /> : <FiLogIn />}
          Inicia sesión
        </Button>
        <Flex justify="center" fontSize="sm" w="full">
          <Link
            color={{
              _dark: "gray.300/80",
              _light: "gray.700",
            }}
            href="#"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </Flex>
      </Flex>
    </FormProvider>
  );
}
