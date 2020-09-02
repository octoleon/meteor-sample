/**
 * @file
 * Customized RC core VariantList component
 */

 import React, { Component } from "react";
 import PropTypes from "prop-types";
 import { Components, replaceComponent } from "@reactioncommerce/reaction-components";

 class FlaneurVariantList extends Component {
    // Customization: automatically click first child variant
    componentDidMount () {
      if (this.props.viewAs !== 'customer') {
        // TODO it is always 'administrator` now
        //return;
      }
      if (!this.props.variants || !this.props.variants.length) {
        return;
      }
      const firstVariant = this.props.variants[0];
      this.autoClickVariant(firstVariant);
    }

    autoClickVariant = variant => {
      const firstChild = this.props.childVariants.find(childVariant => {
        return childVariant.ancestors.includes(variant._id);
      });

      if (variant && firstChild) {
        this.handleChildVariantClick(null, firstChild, 1);
      }
    };

    componentDidUpdate (prevProps) {
      if (this.props.viewAs !== 'customer') {
        // TODO it is always 'administrator` now
        //return;
      }
      if (!this.props.variants || !this.props.variants.length) {
        return;
      }

      const { variantIsSelected } = this.props;

      // If no child variant is selected, auto-select the first
      const selectedVariant = this.props.variants.find(variant => {
        return variantIsSelected(variant._id);
      });
      if (selectedVariant) {
        // A parent variant is selected, determine if one of its child variant is
        let isAnyChildSelected = false;
        const childVariants = this.props.childVariants.filter(childVariant => {
          return childVariant.ancestors.includes(selectedVariant._id);
        });
        childVariants.forEach(childVariant => {
          if (variantIsSelected(childVariant._id)) {
            isAnyChildSelected = true;
          }
        });
        if (isAnyChildSelected === false) {
          this.autoClickVariant(selectedVariant);
        }
      }
    }

   handleVariantEditClick = (event, editButtonProps) => {
     if (this.props.onEditVariant) {
       return this.props.onEditVariant(event, editButtonProps.data);
     }
     return true;
   }

   handleVariantVisibilityClick = (event, editButtonProps) => {
     if (this.props.onVariantVisibiltyToggle) {
       const isVariantVisible = !editButtonProps.data.isVisible;
       this.props.onVariantVisibiltyToggle(event, editButtonProps.data, isVariantVisible);
     }
   }

   handleChildVariantClick = (event, variant) => {
     if (this.props.onVariantClick) {
       this.props.onVariantClick(event, variant, 1);
     }
   }

   handleChildVariantEditClick = (event, editButtonProps) => {
     if (this.props.onEditVariant) {
       return this.props.onEditVariant(event, editButtonProps.data, 1);
     }
     return true;
   }

   isSoldOut(variant) {
     if (this.props.isSoldOut) {
       return this.props.isSoldOut(variant);
     }

     return false;
   }

     renderVariants() {
       let variants = [];
       let addButton;

       if (this.props.editable) {
         addButton = (
           <div className="rui items flex">
             <div className="rui item full justify center">
               <Components.IconButton
                 i18nKeyTooltip="variantList.createVariant"
                 icon="fa fa-plus"
                 primary={true}
                 tooltip="Create Variant"
                 onClick={this.props.onCreateVariant}
               />
             </div>
           </div>
         );
       }


     if (this.props.variants) {
       variants = this.props.variants.map((variant, index) => {
         // Customization: hide price range on variants
         const displayPrice = '';
         //const displayPrice = this.props.displayPrice && this.props.displayPrice(variant._id);

         return (
           <Components.EditContainer
             data={variant}
             disabled={this.props.editable === false}
             editView="variantForm"
             i18nKeyLabel="productDetailEdit.editVariant"
             key={index}
             label="Edit Variant"
             onEditButtonClick={this.handleVariantEditClick}
             onVisibilityButtonClick={this.handleVariantVisibilityClick}
             permissions={["createProduct"]}
             showsVisibilityButton={true}
           >
             <Components.Variant
               displayPrice={displayPrice}
               editable={this.props.editable}
               index={index}
               isSelected={this.props.variantIsSelected(variant._id)}
               onClick={this.props.onVariantClick}
               onMove={this.props.onMoveVariant}
               soldOut={this.isSoldOut(variant)}
               variant={variant}
             />
           </Components.EditContainer>
         );
       });
     }

         const variantList = (
          <div className="size-selector-holder"> <span id="size-selector-holder-span">Select Size</span>
            <ul className="variant-list list-unstyled" id="variant-list" key="variantList">
             {variants}
             {addButton}
           </ul>
           </div>
         );

     if (variants.length === 0 && this.props.editable === false) {
       return variantList;
     } else if (variants.length > 1 || variants.length === 0) {
       return [
         <Components.Divider
           i18nKeyLabel="productDetail.options"
           key="dividerWithLabel"
           label="Options"
         />,
         variantList
       ];
     } else if (variants.length === 1) {
       return [
         <Components.Divider key="divider" />,
         variantList
       ];
     }

     return variantList;
   }

   renderChildVariants() {
     let childVariants = [];

     if (this.props.childVariants) {
       childVariants = this.props.childVariants.map((childVariant, index) => {
         const media = this.props.childVariantMedia.filter((mediaItem) => (
           (mediaItem.document.metadata.variantId === childVariant._id)
         ));

         return (
           <Components.EditContainer
             data={childVariant}
             disabled={this.props.editable === false}
             editView="variantForm"
             i18nKeyLabel="productDetailEdit.editVariant"
             key={index}
             label="Edit Variant"
             onEditButtonClick={this.handleChildVariantEditClick}
             onVisibilityButtonClick={this.handleVariantVisibilityClick}
             permissions={["createProduct"]}
             showsVisibilityButton={true}
           >
             <Components.ChildVariant
               isEditable={this.props.editable}
               isSelected={this.props.variantIsSelected(childVariant._id)}
               media={media}
               onClick={this.handleChildVariantClick}
               variant={childVariant}
             />
           </Components.EditContainer>
         );
       });
     }

     if (childVariants.length) {
        return [
          <Components.Divider
            key="availableOptionsDivider"
            i18nKeyLabel="availableOptions"
            label="Available Options"
          />,
          <div className="size-selector-holder"> <span id="size-selector-holder-span">Select Options</span>
          <div className="row variant-product-options" key="childVariantList">
            {childVariants}
          </div>
          </div>
        ];
      }

      return null;
    }


   render() {
     return (
       <div className="product-variants">
         {this.renderVariants()}
         {this.renderChildVariants()}
       </div>

     );
   }
 }

 FlaneurVariantList.propTypes = {
   childVariantMedia: PropTypes.arrayOf(PropTypes.any),
   childVariants: PropTypes.arrayOf(PropTypes.object),
   displayPrice: PropTypes.func,
   editable: PropTypes.bool,
   isSoldOut: PropTypes.func,
   onCreateVariant: PropTypes.func,
   onEditVariant: PropTypes.func,
   onMoveVariant: PropTypes.func,
   onVariantClick: PropTypes.func,
   onVariantVisibiltyToggle: PropTypes.func,
   variantIsSelected: PropTypes.func,
   variants: PropTypes.arrayOf(PropTypes.object)
 };

 replaceComponent('VariantList', FlaneurVariantList);

 export default FlaneurVariantList;
