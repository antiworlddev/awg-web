import { useState } from "react";

const countries = [
  { name: "Nigeria", currency: "NGN" },
  { name: "United States", currency: "USD" },
  { name: "Canada", currency: "CAD" },
  { name: "United Kingdom", currency: "GBP" },
  // Add more countries and currencies as needed
];

interface CountryDropdownProps {
  setCurrency: (currency: string) => void;
}

const CountryDropdown: React.FC<CountryDropdownProps> = ({ setCurrency }) => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0].name);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country = countries.find((c) => c.name === e.target.value);
    if (country) {
      setSelectedCountry(country.name);
      setCurrency(country.currency);
    }
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="country"
        className="block text-sm font-medium text-gray-700"
      >
        Country
      </label>
      <select
        id="country"
        name="country"
        value={selectedCountry}
        onChange={handleChange}
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        {countries.map((country) => (
          <option key={country.name} value={country.name}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountryDropdown;
