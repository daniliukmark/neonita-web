import { Mail, Phone } from "lucide-react";

const ContactInfoCard = ({
  title,
  name,
  phoneNumber,
  email,
}: {
  title: string;
  name: string;
  phoneNumber: string;
  email: string;
}) => {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm text-stone-300">{title}</span>
      <span className="pb-2 text-xl">{name}</span>
      <span className="flex items-center gap-1 text-base text-stone-300">
        <Mail className="h-5" />
        <span className="duration-300 hover:underline hover:text-stone-200">
          {phoneNumber}
        </span>
      </span>
      <span className="flex items-center gap-1 text-base text-stone-300">
        <Phone className="h-5" />
        <span className="duration-300 hover:underline hover:text-stone-200">
          {email}
        </span>
      </span>
    </div>
  );
};

export default ContactInfoCard;
