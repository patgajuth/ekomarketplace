import Logo from "../ui/Logo";
import MenuSection from "./MenuSection";
import PaymentLogo from "./PaymentLogo";

function Footer() {
  return (
    <footer className="flex justify-center w-full bg-[var(--color-footer)] border-t border-[var(--color-border-primary)]">
      <div className="flex w-full max-w-[1440px] px-6 sm:px-10 lg:px-[60px] py-16 lg:py-24 gap-12 lg:gap-8 flex-col lg:flex-row">
        <div className="flex flex-col gap-y-6 flex-grow basis-0">
          <Logo size="secondary" />
          <p className="textM font-medium text-[var(--textColor-secondary)]">
            © 2023 EkoMarketPlace.
            <br />
            Wszelkie prawa zastrzeżone.
          </p>
          <div className="flex gap-x-[12px] flex-wrap">
            <PaymentLogo imgSrc="https://i.ibb.co/JZQJqLQ/visa.png" alt="Visa" />
            <PaymentLogo imgSrc="https://i.ibb.co/rffY439Y/mastercard.png" alt="Mastercard" />
            <PaymentLogo imgSrc="https://i.ibb.co/d0QZydKk/paypal.png" alt="Paypal" />
            <PaymentLogo imgSrc="https://i.ibb.co/wZLxPRLy/apple-pay.png" alt="ApplePay" />
            <PaymentLogo imgSrc="https://i.ibb.co/d4FLgPcy/g-pay.png" alt="GPay" />
          </div>
        </div>
        <div className="flex gap-x-6 flex-grow basis-0 flex-wrap">
          <MenuSection title="Firma" items={["O nas", "Kontakt", "Partnerzy"]} />
          <MenuSection title="Social media" items={["Instagram", "Twitter", "Facebook", "LinkedIn"]} />
          <MenuSection title="FAQ" items={["Konto", "Dostawy", "Zamówienia", "Płatności"]} />
          <MenuSection title="Materiały" items={["E-booki", "Poradniki", "Kursy", "Blog"]} />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
