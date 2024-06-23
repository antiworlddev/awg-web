"use client";

import Merch from "@/app/ui/merch";
import { generateSlug } from "@/helpers/functions";
import { MerchProps } from "@/helpers/types";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ArtisteMerch({ merch }: { merch: MerchProps[] }) {
  const router = useRouter();
  return (
    <motion.div
      initial={{ y: 200 }}
      whileInView={{ y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="grid lg:grid-cols-4 grid-cols-2 lg:gap-10 gap-5 mb-32 mt-16"
    >
      {merch?.map((m, i) => (
        <Merch
          key={m.id}
          id={m.id}
          image={m.image}
          name={m.name}
          artiste={m.artiste}
          price={m.price}
          viewProduct={() => router.push(`/merch/${m.id}`)}
        />
      ))}
    </motion.div>
  );
}
