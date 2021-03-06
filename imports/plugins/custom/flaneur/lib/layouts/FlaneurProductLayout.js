/**
 * @file
 * Customized core Reaction Commerce "simple" PDP layout.
 * Added custom components.
 * See /imports/plugins/included/product-detail-simple/lib/layout/simple.js
 */

export default function blocks() {
  return [
    // Header block (Full Width)
    {
      type: "block",
      columns: 12,
      element: "div",
      className: "pdp-color-block-fullwidth-container",
      permissions: ["admin"], // Permissions for staff
      audience: ["guest", "anonymous"], // Permissions for customers
      children: [
        {
          type: "block",
          columns: 12,
          element: "header",
          className: "container-main-pdp-container",
          permissions: ["admin"], // Permissions for staff
          audience: ["guest", "anonymous"], // Permissions for customers
          children: [
            {
              component: 'PDPColorTitle'
            },
            // Custom product nav tabs
            {
              component: 'ProductNavTabsContainer'
            },
            // PageTitle
            {
              component: "ProductField",
              permissions: ["admin"],
              audience: ["admin"],
              props: {
                // editable: this.editable,
                fieldName: "pageTitle",
                fieldTitle: "SubTitle",
                element: "h2",
                textFieldProps: {
                  i18nKeyPlaceholder: "productDetailEdit.pageTitle",
                  placeholder: "Subtitle"
                }
              }
            }
          ]
        }
      ]
    },

    // Media block
    // Contains
    // - Medai Gallery
    // - Tags
    // - Details
    {
      type: "block",
      columns: 12,
      size: "full",
      element: "div",
      className: "product-container-whole",
      permissions: ["admin"],
      audience: ["guest", "anonymous"],
      children: [
    {
      type: "block",
      columns: 6,
      size: "half",
      permissions: ["admin"],
      audience: ["guest", "anonymous"],
      style: {
        "@media  only screen and (max-width: 921px)": {
          minWidth: "100%",
          maxWidth: "100%"
        }
      },
      children: [
        // Media Gallery
        {
          component: "MediaGalleryContainer"
        },

        // Tags
        {
          component: "ProductTags"
        },

        // Metadata
        {
          component: "ProductMetadata"
        }
      ]
    },

    // Variant block
    {
      type: "block",
      columns: 6,
      size: "half",
      permissions: ["admin"],
      audience: ["guest", "anonymous"],
      style: {
        "@media  only screen and (max-width: 921px)": {
          minWidth: "100%",
          maxWidth: "100%"
        }
      },
      children: [
        // Custom "product.title in color.name" component
        {
          component: "PDPTitleInColor"
        },
        // Price /  Social Buttons split
        {
          axis: "horizontal",
          align: "center",
          type: "block",
          size: "static variable",
          permissions: ["createProduct"],
          audience: ["guest", "anonymous"],
          style: {
            padding: 0
          },
          children: [
            // Price Range
            {
              type: "block",
              size: "variable",
              style: {
                padding: 0
              },
              children: [
                {
                  component: "PriceRange"
                }
              ]
            },
            // Social Buttons
            {
              type: "block",
              size: "static",
              justify: "end",
              style: {
                padding: 0
              },
              children: [
                {
                  component: "SocialContainer"
                }
              ]
            }
          ]
        },

        // Vendor
        {
          component: "ProductField",
          props: {
            fieldName: "vendor",
            fieldTitle: "Vendor",
            textFieldProps: {
              i18nKeyPlaceholder: "productDetailEdit.vendor",
              placeholder: "Vendor"
            }
          }
        },
        // Customization - removed default description component

        // Variant List
        {
          component: "VariantListContainer"
        },

        // Divider
        {
          component: "Divider"
        },

        // Alerts for checkout
        {
          component: "AlertContainer",
          props: {
            placement: "productDetail"
          }
        },

        // Add to cart button
        {
          component: "AddToCartButton",
          props: {
            style: {
              paddingTop: 20
            }
          }
        },
	    {
	      type: "block",
	      columns: 6,
	      element: "div",
	      className: "pdp info-tabs",
	      children: [
	        {
	          component: 'PDPInfoTabs'
	        }
	      ]
	    },

        // Component that sets correct color to certain elements
        // Last component on PDP so all other elements are available to add bg color
        {
          component: 'PDPColorSetter'
        }
      ]
    }
  ]
},
// Color Description block
{
  type: "block",
  columns: 12,
  element: "div",
  className: "pdp-tab-container",
  children: [
    {
      component: 'PDPColorDescription'
    }
  ]
},
    // Custom page content
    {
      type: "block",
      columns: 12,
      element: "div",
      className: "pdp page-content",
      children: [
        {
          component: 'PDPPageContent'
        }
      ]
    }
  ];
}
