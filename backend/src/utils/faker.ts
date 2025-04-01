import { User } from "@/models/user";

const fakeUserAuth = async () => {
  const fakeCredentials = {
    email: "fake@gmail.com",
    password: "fake_password",
  };
  const fakeAccount = {
    username: "Faker",
    profile: {
      name: "William",
      lastName: "Watson Smith",
      phoneNumber: "2223478190",
      address: {
        street: "Street A",
        city: "New York",
        state: "Los Angeles",
        zipCode: 25628,
        country: "USA",
      },
    },
  };

  const user = new User();
  user.email = fakeCredentials.email;
  user.password = fakeCredentials.password;
  user.username = fakeAccount.username;
  user.profile = fakeAccount.profile;
  await user.save();

  const destroyFakeCredentials = async () => {
    await User.findByIdAndDelete(user._id);
  };
  return { credentials: fakeCredentials, destroyFakeCredentials };
};

export { fakeUserAuth };
