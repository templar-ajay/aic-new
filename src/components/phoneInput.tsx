import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import React from "react";

const PhoneInputComp = ({ value, onChange }: { value: any; onChange: any }) => {
  return (
    <PhoneInput
      onlyCountries={["us"]}
      disableDropdown
      showDropdown={false}
      prefix="+"
      countryCodeEditable={false}
      enableSearch={false}
      disableSearchIcon
      country={"us"}
      {...value}
      {...onChange}
    />
  );
};

export default PhoneInputComp;
