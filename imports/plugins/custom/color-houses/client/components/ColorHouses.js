import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getImageURL } from '../../../flaneur/lib/helpers';
import ColorLink from '/imports/plugins/custom/colors/client/components/ColorLink';
import Isotope from 'isotope-layout';
import ImagesLoaded from 'imagesloaded';
import { $ } from "meteor/jquery";

export default class ColorHouses extends Component {



        componentDidUpdate(){
          var isotope;
          var grid = document.querySelector('.color-house-grid');
          var filterButtonGroup = document.querySelector('.filters');

          function onHashchange() {
            var hashFilter = getHashFilter();
            if ( !hashFilter && isotope ) {
              return;
            }
            if ( !isotope ) {
              // init Isotope for first time
              isotope = new Isotope( grid, {
                itemSelector: '.ast',
                layout: 'vertical',
                filter: hashFilter || '.Art',
              });
            } else {
              // just filter with hash
              isotope.arrange({
                filter: hashFilter
              });
            }

            // set selected class on button
            if ( hashFilter ) {
              var checkedButton  = filterButtonGroup.querySelector('.is-checked');
              if ( checkedButton ) {
                checkedButton.classList.remove('is-checked');
              }
              filterButtonGroup.querySelector('[data-filter="' + hashFilter + '"]').classList.add('is-checked');
            }
          }

          window.addEventListener( 'hashchange', onHashchange );
          // trigger event handler to init Isotope
          onHashchange();

            // bind filter button click
            filterButtonGroup.addEventListener( 'click', function( event ) {
              var filterAttr = event.target.getAttribute('data-filter');
              if ( !filterAttr ) {
                return;
              }
              location.hash = 'filter=' + encodeURIComponent( filterAttr );
            });

            function getHashFilter() {
              // get filter=filterName
              var matches = location.hash.match( /filter=([^&]+)/i );
              var hashFilter = matches && matches[1];
              return hashFilter && decodeURIComponent( hashFilter );
            }

          ImagesLoaded( grid, function() {
            var hashFilter = getHashFilter();
            var isotope = new Isotope( '.color-house-grid', {
              // options...
              itemSelector: '.ast',
              layoutMode: 'vertical',
              filter: hashFilter || '.Art',
              initLayout: true
            });


                  // bind filter button click
                  $('.filters').on( 'click', 'button', function() {
                    var filterValue = $( this ).attr('data-filter');
                    isotope.arrange({ filter: filterValue });
                  });

                  // change is-checked class on buttons
                  $('.button-group').each( function( i, buttonGroup ) {
                    var $buttonGroup = $( buttonGroup );
                    $buttonGroup.on( 'click', 'button', function() {
                      $buttonGroup.find('.is-checked').removeClass('is-checked');
                      $( this ).addClass('is-checked');
                    });
                  });
                });
                };

    static propTypes = {
      colorHouses: PropTypes.array,
      swatchbookColorIds: PropTypes.array.isRequired,
      onSwatchbookAddClick: PropTypes.func.isRequired,
      onSwatchbookRemoveClick: PropTypes.func.isRequired
    };

  render () {
    const {
      colorHouses,
      onColorClick,
      colorHouseTag,
      swatchbookColorIds,
      onSwatchbookRemoveClick,
      onSwatchbookAddClick
    } = this.props;
    return (
<div>



      <div className="color-house-container-box w-container">
       <h1>Color Houses: Our Most Popular Bedding Colors </h1>
        <div className="color-house-ui-group">

            <div className="filters button-group js-radio-button-group color-houses-filters">
<div className="title">Explore by Inspiration:</div>
                <button className="button four is-checked" data-filter=".Art">Color Families</button>
                <button className="button two" data-filter=".Interior">Interior Styles</button>
                <button className="button three" data-filter=".Mood">Mood and Atmospheres</button>
                <button className="button three-at" data-filter=".Coastal"></button>
                <button className="button three-at" data-filter=".Bohemian"></button>
                <button className="button three-at" data-filter=".Van"></button>
                <button className="button three-at" data-filter=".Modern"></button>

            </div>
        </div>
      <div className="color-house-grid">


          {colorHouses.length && colorHouses.map(colorHouse => { const { title, imageFileId, imageFileName, description, colors, colorHouseTag } = colorHouse; const imageURL = getImageURL(imageFileId, imageFileName); return (
        <div className={`ast ${colorHouseTag}`}>
          <div className="color-house-box" key={colorHouse._id}>

            <div className="colorhouse-view">
              <div className="color-house-block w-row">
                <div className="color-house-image-column w-col w-col-8"> <img src={imageURL} alt={title} />
                </div>
                <div className="color-house-detail-column w-col w-col-4">
                  <div className="cr-block">
                    <div className="static-title image-block">{title}</div>
                    <div className="color-house-information"><center>{colorHouseTag}</center></div>
                    <p className="color-house-description" dangerouslySetInnerHTML={{__html: description}} />
                  </div>
                </div>
              </div>

              <div className="colors-container-box">
                <div className="color-box w-inline-block">
                  {colors.map(color => { const { _id, name, hexCode, slug, pantoneCode, pdpURL } = color; return (
                  <ColorLink key={_id} _id={_id} name={name} hexCode={hexCode} slug={slug} pantoneCode={pantoneCode} pdpURL={pdpURL} isInSwatchbook={swatchbookColorIds.includes(_id)} onSwatchbookRemoveClick={onSwatchbookRemoveClick} onSwatchbookAddClick={onSwatchbookAddClick}
                  /> ); })}
                </div>
              </div>
            </div>
          </div>
            </div>
          ); }) || null}

      </div>
      </div></div>); } }
