import { MerchProps } from "@/helpers/types";
import {
  abujaDeliveryFees,
  countryGroups,
  expressInternationalDeliveryFees,
  nigeriaDeliveryFees,
  scalingFactors,
  standardInternationalDeliveryFees,
} from "./shipping-fees";
import jsPDF from "jspdf";

const abuja_cities: any = {
  asokoro: 4500,
};

export const slugify = (text: string) => {
  return (
    text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "") ?? ""
  );
};

export const formatPrice = (currency: string, price: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  });
  const formattedPrice = formatter.format(price);
  return formattedPrice;
};

// These options are needed to round to whole numbers if that's what you want.
//minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
//maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)

export function groupMerchByCategory(
  merch: any[],
): Record<string, MerchProps[]> {
  return merch?.reduce((acc: Record<string, MerchProps[]>, item: any) => {
    if (!acc[item?.category]) {
      acc[item?.category] = [];
    }
    acc[item?.category].push(item);
    return acc;
  }, {});
}
function getRegionByCountry(country: any) {
  for (const [region, countries] of Object.entries(countryGroups)) {
    if (countries.includes(country)) {
      return region;
    }
  }
  return "Unknown Region";
}

function getScalingFactor(quantity: number) {
  let sf = scalingFactors?.find(
    (s) => quantity >= s.min && s.max >= quantity,
  )?.sf;

  return sf ? sf : alert("Too many items to ship.");
}
export const generateSlug = (name: string) =>
  name.replace(/\s+/g, "").toLowerCase();

export function getShippingFee(address: any, weights: any[], type?: any) {
  const { state, country, city } = address;
  console.log(state, country, city, type, weights);

  let cartWeight = weights?.reduce(
    (sum: number, item: any) => item?.quantity * item?.weight + sum,
    0,
  );
  let baseWeight = 1;
  let sf = getScalingFactor(
    weights?.reduce((sum: number, item: any) => item?.quantity + sum, 0),
  );

  let weight = sf ? (baseWeight + cartWeight) * sf : cartWeight;

  console.log(cartWeight, weight);

  if (country?.toLowerCase() === "nigeria") {
    if (state?.toLowerCase() === "abuja") {
      if (!abujaDeliveryFees?.hasOwnProperty(city?.toLowerCase())) {
        return alert("Invalid Abuja City.");
      } else {
        return abujaDeliveryFees[city];
      }
    }

    let fee: any = nigeriaDeliveryFees?.find(
      (n) => weight >= n.min && weight < n.max,
    );
    return fee ? fee[type] : alert("Overweight");
  }

  if (type === "standard") {
    if (
      ["united kingdom", "united states", "canada", "france"].includes(
        country.toLowerCase(),
      )
    ) {
      let region;
      switch (country.trim().toLowerCase()) {
        case "united kingdom":
          region = "UK";
          break;
        case "united states":
          region = "US";
          break;
        case "canada":
          region = "CAN";
          break;
        case "france":
          region = "FRA";
          break;
        default:
          region = "US";
          break;
      }

      let fee: any = standardInternationalDeliveryFees?.find(
        (i: any) => weight >= i.min && weight < i.max,
      );
      console.log(region, country?.toLowerCase());
      return fee ? fee[region] : alert("Overweight");
    } else {
      let region = getRegionByCountry(country);

      if (region === "UNKNOWN") {
        return alert("We don't deliver to this location yet.");
      }

      let fee: any = expressInternationalDeliveryFees?.find(
        (i: any) => weight >= i.min && weight < i.max,
      );

      return fee ? fee[region] : alert("Overweight");
    }
  }

  let region = getRegionByCountry(country);

  if (region === "UNKNOWN") {
    return alert("We don't deliver to this location yet.");
  }

  let fee: any = expressInternationalDeliveryFees?.find(
    (i: any) => weight >= i.min && weight < i.max,
  );

  return fee ? fee[region] : alert("Overweight");
}

export const validateEmail = (email: string) => {
  // Simple but effective regex
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
};

export const createRSVPTicket = (
  name: string,
  email: string,
  ticketType: string,
  description: string,
  quantity: string,
) => {
  const doc = new jsPDF();
  doc.rect(0, 0, 210, 30, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.text(description, 105, 18, { align: "center" });

  // Success Icon Emoji (simple)
  doc.setTextColor(0, 150, 0);
  doc.setFontSize(22);
  doc.text("RSVP Confirmed", 105, 45, { align: "center" });

  // Event Info
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.text(`Name: ${name}`, 20, 65);
  doc.text(`Email: ${email}`, 20, 75);
  doc.text(`Event: ${description}`, 20, 95);
  doc.text(`Ticket Type: ${ticketType}`, 20, 105);
  doc.text(`Quantity: ${quantity}`, 20, 115);

  // Footer
  doc.setFontSize(10);
  doc.setTextColor(120, 120, 120);
  doc.text(
    "Thank you for your RSVP. Please keep this confirmation for entry.",
    105,
    280,
    { align: "center" },
  );

  doc.save(`RSVP_${name}.pdf`);
  doc.save(`RSVP-${name.replace(/\s+/g, "_")}.pdf`);
};
