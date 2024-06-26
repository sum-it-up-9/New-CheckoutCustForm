import React, { useState, useEffect } from "react";

const CustomerPreferred = {
  CarrierName: {
    label: "Carrier Name",
    type: "text",
    formName: "CustomerPreferredObj",
    required: true,
  },
  ContactName: {
    label: "Contact Name",
    type: "text",
    formName: "CustomerPreferredObj",
    required: true,
  },
  Name: {
    label: "Name",
    type: "text",
    formName: "CustomerPreferredObj",
    required: true,
  },
  ContactPhone: {
    label: "Contact Phone",
    type: "text",
    formName: "CustomerPreferredObj",
    required: true,
  },
  Address1: {
    label: "Address 1",
    type: "text",
    formName: "CustomerPreferredObj",
    required: true,
  },
  Address2: {
    label: "Address 2",
    type: "text",
    formName: "CustomerPreferredObj",
    required: false,
  },
  State: {
    label: "State",
    type: "dropdown",
    formName: "CustomerPreferredObj",
    required: true,
  },
  City: {
    label: "City",
    type: "text",
    formName: "CustomerPreferredObj",
    required: true,
  },
  Zip: {
    label: "Zip",
    type: "text",
    formName: "CustomerPreferredObj",
    required: true,
  },
  Country: {
    label: "Country",
    type: "dropdown",
    formName: "CustomerPreferredObj",
    required: true,
  },
};

const WillCall = {
  ContactName: {
    lable: "Contact Name",
    type: "text",
    formName: "WillCallObj",
    required: true,
  },
  ContactEmail: {
    lable: "Contact Email",
    type: "email",
    formName: "WillCallObj",
    required: true,
  },
  ContactPhone: {
    lable: "Contact Phone",
    type: "text",
    formName: "WillCallObj",
    required: true,
  },
};

const UPS = {
  Ground: {
    label: "Ground",
    type: "radio",
    formName: "UPSObj",
  },
  "2nd Day Air": {
    label: "2nd Day Air",
    type: "radio",
    formName: "UPSObj",
  },
  "2nd Day Air AM": {
    label: "2nd Day Air AM",
    type: "radio",
    formName: "UPSObj",
  },
  "3 Day Select": {
    label: "3 Day Select",
    type: "radio",
    formName: "UPSObj",
  },
  "Next Day Air": {
    label: "Next Day Air",
    type: "radio",
    formName: "UPSObj",
  },
  "Next Day Air AM": {
    label: "Next Day Air AM",
    type: "radio",
    formName: "UPSObj",
  },
  "Next Day Air Saver": {
    label: "Next Day Air Saver",
    type: "radio",
    formName: "UPSObj",
  },
};

const FedEx = {
  Ground: {
    label: "Ground",
    type: "radio",
    formName: "FedExObj",
  },
  "1DayFreight": {
    label: "1 Day Freight",
    type: "radio",
    formName: "FedExObj",
  },
  "2Day": {
    label: "2 Day",
    type: "radio",
    formName: "FedExObj",
  },
  "2DayFreight": {
    label: "2 Day Freight",
    type: "radio",
    formName: "FedExObj",
  },
  "3DayFreight": {
    label: "3 Day Freight",
    type: "radio",
    formName: "FedExObj",
  },
  ExpressSaver: {
    label: "Express Saver",
    type: "radio",
    formName: "FedExObj",
  },
  FirstOvernight: {
    label: "First Overnight",
    type: "radio",
    formName: "FedExObj",
  },
  GroundHomeDelivery: {
    label: "Ground Home Delivery",
    type: "radio",
  },
  PriorityOvernight: {
    label: "Priority Overnight",
    type: "radio",
    formName: "FedExObj",
  },
  StandardOvernight: {
    label: "Standard Overnight",
    type: "radio",
    formName: "FedExObj",
  },
};

let extensionService;
const ExtensionCommandType = {
  ReloadCheckout: "EXTENSION:RELOAD_CHECKOUT",
  ShowLoadingIndicator: "EXTENSION:SHOW_LOADING_INDICATOR",
  SetIframeStyle: "EXTENSION:SET_IFRAME_STYLE",
};

async function sendMessage(){
  window.top.postMessage(
    "hide-checkout-shipping-continue",
    "https://vivacommerce-b2b-demo-i9.mybigcommerce.com"
  );
}

let payload;
const CustomForm = () => {
  const [formData, setFormData] = useState({});
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [accountNumber, setAccountNumber] = useState(0);
  const [sellarsShipper, setSellarsShipper] = useState("Prepaid Truckload");

  const [checkoutid, setCheckoutid] = useState(0);

  const [customerPreferredObj, setCustomerPreferredObj] = useState({
    CarrierName: "",
    ContactName: "",
    Name: "",
    ContactPhone: "",
    Address1: "",
    Address2: "",
    State: "",
    City: "",
    Zip: "",
    Country: "",
  });

  const [WillCallObj, setWillCallObj] = useState({
    ContactName: "",
    ContactPhone: "",
    ContactEmail: "",
  });

  const [FedExObj, setFedExObj] = useState("Ground");
  const [UPSObj, setUPSObj] = useState("Ground");

  const [whoPaysShippping, setWhoPaysShipping] = useState(
    "Sellars Pays Freight"
  );
  const [isUsingFedExAccount, setIsUsingFedExAccount] = useState("Yes");
  const [isDisplayingAccountNumber, setIsDisplayingAccountNumber] =
    useState("FedEx");
  const [FormFields, setFormFields] = useState(FedEx);
  console.log(typeof FormFields);
  const [selectedRadioOption, setSelectedRadioOption] = useState("Ground");

  // const handleSubmit = () => {
  //   console.log("handlesubmit called");
  //   fetch(`http://localhost:3000/cart/cart1`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Response from server:", data);
  //       // Do something with the response data
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };

  const handleRadioOptionChange = (event) => {
    setSelectedRadioOption(event.target.value);
  };

  const handleInputChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };
  const [selectedShipper, setSelectedShipper] = useState("FedEx");

  const handleShippingChange = (event) => {
    // console.log(event.target.value);
    setWhoPaysShipping(event.target.value)
    sendMessage();
    extensionService.post({ type: ExtensionCommandType.ReloadCheckout });;

    //call azure function to update the product prices
  };

  const handleSellersShipperChange = (e) => {
    setSellarsShipper(e.target.value);
    sendMessage();
 
  };

  function handleWillCallChange(e) {
    setWillCallObj((prev) => {
      console.log({ ...prev, [e.target.name]: e.target.value });
      //console.log(e.target.name, e.target.value);
      return { ...prev, [e.target.name]: e.target.value };
    });
    //sendMessage();
  }

  function handleFedExChange(e) {
    setFedExObj(e.target.value);
    console.log("change", e.target.value);
   // sendMessage();
  }

  function handleUPSChange(e) {
    setUPSObj(e.target.value);
    //sendMessage();
  }

  function handleCustomerPreferredChange(e) {
    setCustomerPreferredObj((prev) => {
      //console.log({...prev,[e.target.name]:e.target.value});
      //console.log(e.target.name, e.target.value);
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  const handleShipperChange = (event) => {
    const Shipper = event.target.value;
    console.log("shipper to use: ", event.target.value);
    setSelectedShipper(Shipper);
    // setFormFields(event.target.value);
    if (Shipper === "UPS") {
      setFormFields(UPS);
      setIsDisplayingAccountNumber("UPS");
    } else if (Shipper === "Will Call") {
      setFormFields(WillCall);
      setIsDisplayingAccountNumber("WillCall");
    } else if (Shipper === "FedEx") {
      setFormFields(FedEx);
      setIsDisplayingAccountNumber("FedEx");
    } else if (Shipper === "Customer Preferred Carrier") {
      setFormFields(CustomerPreferred);
      setIsDisplayingAccountNumber("Customer Preferred Carrier");
    }
    sendMessage();
  };

  const renderFormField = (fieldName, fieldType, formName) => {
    //console.log(fieldName, "name");
    // console.log(fieldType, "fieldType");
    //console.log(fieldOptions, "sdf");
    console.log("called");
    if (fieldType.type === "text") {
      console.log("req: ", fieldType.required);
      return (
        <>
          {fieldName}
          <input
            type="text"
            name={fieldName}
            required={fieldType.required}
            value={formName[fieldName]}
            onChange={(e) => {
              if (formName === "FedExObj") {
                handleFedExChange(e);
              } else if (formName === "WillCallObj") {
                handleWillCallChange(e);
              } else if (formName === "UPSObj") {
                handleUPSChange(e);
              } else if (formName === "CustomerPreferredObj") {
                handleCustomerPreferredChange(e);
              }
            }}
            placeholder={fieldName}
          />
        </>
      );
    } else if (fieldType.type === "dropdown") {
      let fieldOptions = [1, 2, 3, 4];
      return (
        <select
          name={fieldName}
          value={fieldType[fieldName]}
          required={fieldType.required}
          onChange={(e) => {
            if (formName === "FedExObj") {
              handleFedExChange(e);
            } else if (formName === "WillCallObj") {
              handleWillCallChange(e);
            } else if (formName === "UPSObj") {
              handleUPSChange(e);
            } else if (formName === "CustomerPreferredObj") {
              handleCustomerPreferredChange(e);
            }
          }}
        >
          <option value="">Select {fieldName}</option>
          {fieldOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    } else if (fieldType.type === "radio") {
      return (
        <div>
          <input
            type="radio"
            name={fieldName}
            value={fieldType.label}
            checked={
              formName === "FedExObj"
                ? FedExObj === fieldType.label
                : UPSObj === fieldType.label
            }
            onChange={(e) => {
              if (formName === "FedExObj") {
                handleFedExChange(e);
              } else if (formName === "UPSObj") {
                handleUPSChange(e);
              }
            }}
          />
          {fieldType.label}
        </div>
      );
    } else if (fieldType.type === "email") {
      return (
        <>
          <label htmlFor={fieldName}>{fieldType.lable}</label>

          <input
            id={fieldName}
            type="email"
            name={fieldName}
            value={formName[fieldName]}
            onChange={(e) => {
              if (formName === "FedExObj") {
                handleFedExChange(e);
              } else if (formName === "WillCallObj") {
                handleWillCallChange(e);
              } else if (formName === "UPSObj") {
                handleUPSChange(e);
              } else if (formName === "CustomerPreferredObj") {
                handleCustomerPreferredChange(e);
              }
            }}
            placeholder="Enter email"
          />
        </>
      );
    }
  };

  const handleFedExAccountChange = (e) => {
    setIsUsingFedExAccount(e.target.value);
  };

  // async function updateCartDiscount() {
  //   console.log('inside updateCartDiscount ');
  //   const myHeaders = new Headers();
  //   myHeaders.append("X-Auth-Token", "44v4r4o38ki0gznr4kn5exdznzft69c");
  //   myHeaders.append("Content-Type", "application/json");
  //   myHeaders.append( 'Access-Control-Allow-Origin', '*');
  //   //const raw = JSON.stringify({ "cart": { "discounts": [{ "discounted_amount": 2, "name": "manual" }] } });

  //   const checkoutid = cart.id;
  //   const res=await fetch(`https://api-hit-pied.vercel.app/discount/${checkoutid}`, { method: "GET", headers: myHeaders, redirect: "follow" });
  //   const data= await res.json();
  //   console.log('updated cart value returned from dicounted api: ',data);
  // }

  async function UpdateCartPrice() {
    console.log("inside UpdateCartPrice ");
    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*");
    
   
    const raw = JSON.stringify( {
      checkoutId:checkoutid,
      whoPaysShipping: whoPaysShippping === 'Customer Pays Freight' ? 'Customer' : 'Seller',
      metafields:payload
    });

    const res = await fetch(
      `http://localhost:3000/updateCartItems`,
      { method: "POST", headers: myHeaders, body: raw, redirect: "follow" }
    );
    const data = await res.json();
    console.log("updated cart prices and metafield data returned: ", data);
    console.log("reload checkout");
    extensionService.post({ type: ExtensionCommandType.ReloadCheckout });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (whoPaysShippping === "Sellars Pays Freight") {
      payload = {
        whoPaysShippping,
        sellarsShipper,
      };
    } else if (whoPaysShippping === "Customer Pays Freight") {
      if (selectedShipper === "FedEx") {
        payload = {
          whoPaysShippping,
          shipper: selectedShipper,
          useFedExAccount: isDisplayingAccountNumber,
          specialInstructions,
        };
        if (payload.useFedExAccount) {
          payload.AccountNumber = accountNumber;
        }
      } else if (selectedShipper === "Customer Preferred Carrier") {
        payload = {
          whoPaysShippping,
          shipper: selectedShipper,
          AccountNumber: accountNumber,
          formData: customerPreferredObj,
          specialInstructions,
        };
      } else if (selectedShipper === "UPS") {
        payload = {
          whoPaysShippping,
          shipper: selectedShipper,
          AccountNumber: accountNumber,
          formData: UPSObj,
          specialInstructions,
        };
      } else if (selectedShipper === "Will Call") {
        payload = {
          whoPaysShippping,
          shipper: selectedShipper,
          formData: WillCallObj,
          specialInstructions,
        };
      }
    }
    // console.log(payload);
    UpdateCartPrice();
    window.top.postMessage(
      "show-checkout-shipping-continue",
      "https://vivacommerce-b2b-demo-i9.mybigcommerce.com"
    );
  };

  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  function showLoadingIndicator() {
    extensionService.post({
      type: ExtensionCommandType.ShowLoadingIndicator,
      payload: { show: true },
    });
  }

  function hideLoadingIndicator() {
    extensionService.post({
      type: ExtensionCommandType.ShowLoadingIndicator,
      payload: { show: false },
    });
  }

  async function consignmentUpdateTriggered(extensionService, cartId, data) {
    console.log("consignments changed", data);
    compareConsignments(data.payload.consignments, data.payload.previousConsignments);

    showLoadingIndicator(extensionService);
    //post message to parent window - hide continue button
    window.top.postMessage(
      "hide-checkout-shipping-continue",
      "https://vivacommerce-b2b-demo-i9.mybigcommerce.com"
    );

    //perform price update operations

    try {

      //await requestCartPriceUpdate(cartId);
      await UpdateCartPrice();
    } catch (e) {
      console.log("Error in requestCartPriceUpdate");
    }

    //sleep for 3 seconds
    await sleep(1000);
    //post message to parent window - show continue button
    hideLoadingIndicator();
    window.top.postMessage(
      "show-checkout-shipping-continue",
      "https://vivacommerce-b2b-demo-i9.mybigcommerce.com"
    );
    //window.top.postMessage("checkout-shipping-next-step", "https://sellars-absorbent-materials-sandbox-1.mybigcommerce.com");
  }

  async function requestCartPriceUpdate(cartId) {
    //make fetch call to  http://localhost:7071/api/updateProductPrices with cartID as a post json
    //test with California and Florida
    const cartUpdate = await fetch(
      "http://localhost:7071/api/updateProductPrices",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          checkoutId: cartId,
          fedex: {
            accountNumber: "CUST-101",
          },
        }),
      }
    ).then((response) => {
      console.log(response);
      return response.json();
    });

    console.log(cartUpdate);
  }

  function compareConsignments(consignments, previousConsignments) {
    let changed = false;
    consignments.forEach((consignment) => {
      const {
        id,
        shippingAddress: { country, stateOrProvinceCode },
      } = consignment;
      //const shippingOptionId = consignment?.selectedShippingOption?.id;

      if (previousConsignments.length === 0) {
        changed = true;
      } else {
        const prevConsignment = previousConsignments.find(
          (prev) => prev.id === id
        );
        const previousCountry = prevConsignment.shippingAddress.country;
        const previousStateOrProvinceCode =
          prevConsignment.shippingAddress.stateOrProvinceCode;
        //  const previousShippingOptionId = prevConsignment?.selectedShippingOption?.id;

        if (country !== previousCountry) {
          console.log(
            `️🔄 Consignment #${id} shipping country change: ${previousCountry} -> ${country}.`
          );
          changed = true;
        }
        if (stateOrProvinceCode !== previousStateOrProvinceCode) {
          console.log(
            `️🔄 Consignment #${id} shipping state change: ${previousStateOrProvinceCode} -> ${stateOrProvinceCode}.`
          );
          changed = true;
        }
        // if (shippingOptionId !== previousShippingOptionId) {
        //   console.log(`️🔄 Consignment #${id} shipping option change: ${previousShippingOptionId} -> ${shippingOptionId}.`);
        //   changed = true;
        // }
      }
    });
    return changed;
  }

  useEffect(() => {
    checkoutKitLoader.load("extension").then(async function (module) {
      console.log("Checkout loader - extension");
      const params = new URL(document.location).searchParams;

      console.log("params: ", params);

      const extensionId = params.get("extensionId");
      console.log("this is exctention id: ", extensionId);
      const cartId = params.get("cartId");

      console.log("this is card id: ", cartId);
      const parentOrigin = params.get("parentOrigin");
      console.log("this is parentOrigin: ", parentOrigin);

      extensionService = await module.initializeExtensionService({
        extensionId,
        parentOrigin,
        taggedElementId: "container",
      });

      console.log("extentionService: ", extensionService);

      extensionService.addListener(
        "EXTENSION:CONSIGNMENTS_CHANGED",
        async (data) => {
          console.log("inside consignments chnaged listener");
          console.log(data?.payload?.consignments,data?.payload?.previousConsignments);

          const priceUpdateNeeded = compareConsignments(
            data?.payload?.consignments,
            data?.payload?.previousConsignments
          );
          if (priceUpdateNeeded) {
            console.log("Consignment updated, need to trigger price update.");
            consignmentUpdateTriggered(extensionService, cartId, data);
          } else {
            console.log(
              "Key Consignment fields(country, state, shipping option) not updated, no need to trigger price update."
            );
          }
          //call azure function to update the product prices
        }
      );

      setCheckoutid(cartId);
    });

    // Cleanup function
    return () => {
      // Cleanup code if necessary
    };
  }, []);

  return (
    <div id="container">
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <div style={{ marginBottom: "5px" }}>Who Pays Shipping</div>
            <select
              required
              style={{ marginBottom: "10px" }}
              onChange={handleShippingChange}
              name=""
              id=""
            >
              <option value="Sellars Pays Freight">Sellars Pays Freight</option>
              <option value="Customer Pays Freight">
                Customer Pays Freight
              </option>
            </select>
            {/* <div style={{ position: "relative", width: "200px" }}>
              <select
                required
                style={{
                  width: "100%", // Adjust the width as needed
                  height: "30px", // Adjust the height as needed
                  fontSize: "12px", // Adjust the font size as needed
                }}
                onChange={handleShippingChange}
                name=""
                id=""
                defaultValue="Customer Pays Freight" // Set default value
              >
                <option value="Sellars Pays Freight">
                  Sellars Pays Freight
                </option>
                <option value="Customer Pays Freight">
                  Customer Pays Freight
                </option>
              </select>
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  fontSize: "10px",
                }}
              >
                Who Pays Shipping
              </div>
            </div> */}
          </div>

          {whoPaysShippping === "Sellars Pays Freight" ? (
            <div>
              <div style={{ marginBottom: "5px" }}>Shipper To Use</div>
              <select
                required
                onChange={handleSellersShipperChange}
                name=""
                id=""
              >
                <option value="Prepaid Truckload">Prepaid Truckload</option>
                <option value="Prepaid LTL">Prepaid LTL</option>
              </select>
            </div>
          ) : (
            <>
              <div>
                <div style={{ marginBottom: "5px" }}>Shipper To Use</div>
                <select onChange={handleShipperChange} name="" id="">
                  <option value="FedEx">FedEx</option>
                  <option value="Customer Preferred Carrier">
                    Customer Preferred Carrier
                  </option>

                  <option value="UPS">UPS</option>
                  <option value="Will Call">Will Call</option>
                </select>
              </div>
              {isDisplayingAccountNumber === "Customer Preferred Carrier" ||
              isDisplayingAccountNumber === "UPS" ? (
                <div>
                  <div>Account Number</div>
                  <input
                    type="text"
                    required
                    onChange={(e) => {
                      setAccountNumber(e.target.value);
                    }}
                  />
                </div>
              ) : null}

              {isDisplayingAccountNumber === "FedEx" && (
                <>
                  <div>
                    <label htmlFor="useFedExAccount">
                      Use My FedEx Account
                    </label>
                  </div>
                  <select
                    onChange={handleFedExAccountChange}
                    name="useFedExAccount"
                    id="useFedExAccount"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>

                  {isUsingFedExAccount === "Yes" && (
                    <div>
                      <div>Account Number</div>
                      <input
                        type="text"
                        onChange={(e) => {
                          setAccountNumber(e.target.value);
                        }}
                        required
                      />
                    </div>
                  )}
                </>
              )}

              <div></div>

              <div>
                <div>
                  {Object.entries(FormFields).map(([fieldName, fieldType]) => (
                    <div key={fieldName}>
                      {renderFormField(
                        fieldName,
                        fieldType,
                        fieldType?.formName
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <div>
            <div style={{ marginTop: "10px" }}>
              <label htmlFor="specialInstructions">Special Instructions</label>
            </div>
            <textarea
              name="specialInstructions"
              id="specialInstructions"
              onChange={(e) => {
                setSpecialInstructions(e.target.value);
              }}
              rows={4} // Set the number of visible text lines
              cols={25} // Set the number of visible text columns
            />
          </div>
          <button
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "10px 30px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
            }}
            type="submit"
          >
            Submit Shipping Options
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomForm;
