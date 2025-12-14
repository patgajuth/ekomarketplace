import Logo from "../ui/Logo";
import MenuSection from "./MenuSection";
import PaymentLogo from "./PaymentLogo";

function Footer() {
  return (
    <footer className="flex justify-center w-full bg-[var(--color-footer)]">
      <div className="flex w-full max-w-[1440px] px-[60px] py-[140px] ">
        <div className="flex flex-col gap-y-[24px] flex-grow basis-0">
          <Logo size="secondary" />
          <p className="textM font-medium text-[var(--textColor-secondary)]">
            © 2023 NexusHub.
            <br />
            All rights reserved.
          </p>
          <div className="flex gap-x-[12px]">
            <PaymentLogo imgSrc="https://i.ibb.co/JZQJqLQ/visa.png" alt="Visa" />
            <PaymentLogo imgSrc="https://i.ibb.co/rffY439Y/mastercard.png" alt="Mastercard" />
            <PaymentLogo imgSrc="https://i.ibb.co/d0QZydKk/paypal.png" alt="Paypal" />
            <PaymentLogo imgSrc="https://i.ibb.co/wZLxPRLy/apple-pay.png" alt="ApplePay" />
            <PaymentLogo imgSrc="https://i.ibb.co/d4FLgPcy/g-pay.png" alt="GPay" />
          </div>
        </div>
        <div className="flex gap-x-2 flex-grow basis-0">
          <MenuSection title="Company" items={["About Us", "Contact", "Partner"]} />
          <MenuSection title="Social" items={["Instagram", "Twitter", "Facebook", "Linkedin"]} />
          <MenuSection title="FAQ" items={["Account", "Deliveries", "Orders", "Payments"]} />
          <MenuSection title="Resources" items={["E-books", "Tutorials", "Course", "Blog"]} />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
