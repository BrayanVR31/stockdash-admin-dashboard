import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { Field, Btn } from "@shared/ui";
import { SupplierInput } from "../../types";
import { createSupplier } from "../../services";

export function SupplierForm() {
	// React router
	const navigate = useNavigate();
	const { mutate } = useMutation({
		mutationFn: createSupplier,
		onSuccess: () =>
			navigate({
				pathname: "/dashboard/suppliers",
			}),
		onError: () => console.log("error"),
	});
	// Form state
	const { register, handleSubmit } = useForm<SupplierInput>();
	// Event handlers
	const onSubmit: SubmitHandler<SupplierInput> = (data) => {
		console.log(data);
		mutate(data);
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<section className="mb-8" id="general-info">
				<h5 className="font-semibold text-slate-600 mb-6">
					Información general
				</h5>

				<div className="grid grid-cols-2 gap-x-4 mb-4">
					{/** Name */}
					<div >
						<label
							className="text-sm font-semibold text-slate-700"
							htmlFor="name"
						>
							Nombre
						</label>
						<Field.Input
							className="mt-2"
							id="name"
							type="text"
							placeholder="Escribe el nombre del proveedor"
							{...register("name")}
						/>
					</div>
					<div>
						<label
							className="text-sm font-semibold text-slate-700"
							htmlFor="image"
						>
							Imagen
						</label>
						<Field.Input
							className="mt-2"
							id="image"
							type="file"
						/>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-x-4 mb-4">
					{/** Name */}
					<div >
						<label
							className="text-sm font-semibold text-slate-700"
							htmlFor="email"
						>
							Email
						</label>
						<Field.Input
							className="mt-2"
							id="email"
							type="email"
							placeholder="Escribe el email del proveedor"
							{...register("contact.email")}
						/>
					</div>
					<div>
						<label
							className="text-sm font-semibold text-slate-700"
							htmlFor="phoneNumber"
						>
							Número de telefóno
						</label>
						<Field.Input
							className="mt-2"
							id="phoneNumber"
							type="text"
							placeholder="Escribe el número de telefóno del proveedor"
							{...register("contact.phoneNumber")}
						/>
					</div>
				</div>
			</section>
			

			{/** Address */}
			<section className="mb-8" id="address-info">
				<h5 className="font-semibold text-slate-600 mb-6">
					Dirección del proveedor
				</h5>

				<div className="grid grid-cols-2 gap-x-4 mb-4">
					{/** Street field */}
					<div>
						<label
							className="text-sm font-semibold text-slate-700"
							htmlFor="street"
						>
							Calle
						</label>
						<Field.Input
							className="mt-2"
							id="street"
							type="text"
							placeholder="Escribe la calle del proveedor"
							{...register("address.street")}
						/>
					</div>

					{/** neighborhood field */}
					<div>
						<label
							className="text-sm font-semibold text-slate-700"
							htmlFor="neighborhood"
						>
							Colonia
						</label>
						<Field.Input
							className="mt-2"
							id="neighborhood"
							type="string"
							placeholder="Escribe la colonia del proveedor"
							{...register("address.neighborhood")}
						/>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-x-4 mb-4">
					{/** Zip code field */}
					<div>
						<label
							className="text-sm font-semibold text-slate-700"
							htmlFor="zipCode"
						>
							Código postal
						</label>
						<Field.Input
							className="mt-2"
							id="zipCode"
							type="number"
							placeholder="Escribe el código postal del proveedor"
							{...register("address.zipCode")}
						/>
					</div>

					{/** State field */}
					<div className="flex-1">
						<label
							className="text-sm font-semibold text-slate-700"
							htmlFor="state"
						>
							Estado
						</label>
						<Field.Input
							className="mt-2"
							id="state"
							type="text"
							placeholder="Escribe el estado del proveedor"
							{...register("address.state")}
						/>
					</div>
				</div>	
			</section>

			{/** Social media */}
			<section className="mb-8" id="address-info">
				<h5 className="font-semibold text-slate-600 mb-6">
					Redes sociales del proveedor
				</h5>
				{/** Facebook field */}
				<div className="mb-4">
					<label
						className="text-sm font-semibold text-slate-700"
						htmlFor="facebook"
					>
						Facebook
					</label>
					<Field.Input
						className="mt-2"
						id="facebook"
						type="url"
						placeholder="Escribe el url de la red social"
						{...register("socialMedia.facebook")}
					/>
				</div>

				{/** Tiktok field */}
				<div className="mb-4">
					<label
						className="text-sm font-semibold text-slate-700"
						htmlFor="tiktok"
					>
						Tiktok
					</label>
					<Field.Input
						className="mt-2"
						id="tiktok"
						type="url"
						placeholder="Escribe el url de la red social"
						{...register("socialMedia.tiktok")}
					/>
				</div>

				{/** Twitter field */}
				<div className="mb-4">
					<label
						className="text-sm font-semibold text-slate-700"
						htmlFor="twitter"
					>
						Twitter
					</label>
					<Field.Input
						className="mt-2"
						id="twitter"
						type="url"
						placeholder="Escribe el url de la red social"
						{...register("socialMedia.twitter")}
					/>
				</div>
			</section>

			<div className="grid">
				<Btn.Button type="submit">Registrar</Btn.Button>
			</div>
		</form>
	);
}