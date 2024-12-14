import { TiSocialFacebook } from "react-icons/ti";
import { IoLogoTiktok } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { SocialMedia } from "../../types";

// Types
type SMOptions = Array<keyof SocialMedia>;

// Default icons and specific key depending url key object
const icons = {
	facebook: {
		item: <TiSocialFacebook />,
		color: "flex bg-blue-600 hover:bg-blue-600/90 text-white text-xl",
	},
	tiktok: { item: <IoLogoTiktok />, color: "flex bg-slate-900 hover:bg-slate-900/90 text-white" },
	twitter: { item: <FaXTwitter />, color: "flex bg-blue-600 hover:bg-blue-500" },
	instagram: {
		item: <FaInstagram />,
		color: "flex bg-blue-600 hover:bg-blue-500",
	},
};

interface Props {
	links: SocialMedia;
}

export function SocialMediaList({ links }: Props) {
	const keys = links && Object.keys(links) as SMOptions; 
	if (keys.length === 0) return <span>Sin redes sociales</span>;
	return (
		<>
			{keys.map((key) => (icons[key] && links[key]) && 
				<a target="_blank" className={`w-7 h-7 rounded-full text-md items-center justify-center ${icons[key].color}`} href={links[key]}>{icons[key].item}</a>)}
		</>
	);
}