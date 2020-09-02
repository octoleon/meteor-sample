import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Isotope from 'isotope-layout';
import { $ } from "meteor/jquery";

export default class IndexView extends Component {

  componentDidMount() {

    // set up isotope
    var isotope = new Isotope( '.grid', {
      // options...
      itemSelector: '.element-item'
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
  }

  render () {
    return (
      <div>
        <div className="page-plain-block">
          <div className="static-container-page w-container">
              <div className="faq-block">
                  <h3 className="content-page-title">Bud to Bed: Flaneur Traceable Supply Chain</h3><img src="https://fr-assets.com/images/line6.png" width="1440" className="image-52" />
                  <div>
                  <p className="paragraph">A sophisticated, traceable supply chain is the backbone of our customization service. We only work with the best materials and top-notch craftsmen around the world.</p><br/>
<p> Filter:</p>
                      <div className="book">
                          <div className="groups">
                              <div className="ui-group">
                                  <div className="filters button-group js-radio-button-group">
                                      <button className="button one is-checked" data-filter="*">Show All</button>

                                      <button className="button four" data-filter=".shanghai">Shanghai</button>
                                      <button className="button twelve" data-filter=".fresh">Fresh</button>
                                      <button className="button six" data-filter=".tech">Tech</button>
                                      <button className="button seven" data-filter=".los">Los Angeles</button>
                                      <button className="button seven" data-filter=".weaving">Weaving</button>
                                      <button className="button twelve" data-filter=".mill">Mill</button>
                                      <button className="button seven" data-filter=".thread">Thread</button>

                                      <button className="button thirteen" data-filter=".color">Color</button>
                                      <button className="button twelve" data-filter=".metal">Soft</button>
                                      <button className="button eleven" data-filter=".light">Light</button>
                                      <button className="button ten" data-filter=".water">Water</button>
                                      <button className="button fourteen" data-filter=".craft">Craftsmanship</button>
                                      <button className="button nine" data-filter=".flaneur">flâneur</button>
                                      <button className="button sixteen" data-filter=".dye">Garment Dye</button>
                                      <button className="button eight" data-filter=".fabric">Fabric</button>
                                      <button className="button eight" data-filter=".golden">Golden Sheen</button>
                                      <button className="button three" data-filter=".cotton">100% Supima® Cotton</button>
                                      <button className="button eight" data-filter=".dyed">Dyed to Order</button>
                                      <button className="button two" data-filter=".quality">Quality Check</button>

                                      <button className="button fifteen" data-filter=".cut">Cut and Sew</button>
                                  </div>
                              </div>
                          </div>

                          <div className="grid">
                              <div className="element-item quality fabric dyed los angeles color" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-8.23.37-PM-p-500-2.png" width="340" height="300" />
                                  <p className="weight">Every corner, every inch is reviewed for craftsmanship and construction before it is shipped.</p>
                                  <p className="filed_under">Los Angeles • Quality Check • Dyed to Order</p>
                              </div>

                              <div className="element-item los angeles color dye" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-8.55.13-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">A spectrum of swatches await review.</p>
                                  <p className="filed_under">Los Angeles • Color • Garment Dye</p>
                              </div>
                              <div className="element-item color los angeles dye dyed" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-8.52.23-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">Your order arrives. We then look for the perfect match.</p>
                                  <p className="filed_under">Los Angeles • Color • Dyed to Order</p>

                              </div>

                              <div className="element-item weaving mill cotton craft soft light golden" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-9.34.02-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">Loose and thick, but inching closer to the magic of luxurious bedding.</p>
                                  <p className="filed_under">Weaving • 100% Supima Cotton • Mill • Golden</p>

                              </div>
                              <div className="element-item shanghai outside people culture" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-9.24.11-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">Riveted with intent, local women beginning their day around 5 a.m.</p>
                                  <p className="filed_under">Shanghai • flâneur</p>
                              </div>
                              <div className="element-item shanghai outside people culture water" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-9.23.59-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">Framed by an eclectic blend of shopping and office space, a playful water space offers people a brief respite from the day.</p>
                                  <p className="filed_under">Shanghai • flâneur • Water</p>
                              </div>
                              <div className="element-item shanghai outside color culture art flaneur" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-9.24.15-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">The mythical Kirin statue, a chimerical creature seen as having an an auspicious connection to the arrival or passing of a sage or ruler</p>
                                  <p className="filed_under">Shanghai • flâneur • Color</p>
                              </div>
                              <div className="element-item shanghai outside color light" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-9.23.47-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">Lush trees reflect their vibrant hues off the water, forming an intriguing composite with the brick and stone.</p>
                                  <p className="filed_under">Shanghai • flâneur • Color • Water</p>
                              </div>
                              <div className="element-item shanghai inside cotton craft tech color thread mill weaving" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-9.34.15-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">From its raw form, cotton is spun into thread.</p>
                                  <p className="filed_under">100% Supima Cotton • Weaving • Mill • Thread</p>
                              </div>
                              <div className="element-item cotton los angeles tech light quality mill weaving" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-9.34.23-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">This is where art and science meet—the quality and consistency of threads are measured by machine.</p>
                                  <p className="filed_under">Weaving • Mill • Quality Check • Tech</p>
                              </div>
                              <div className="element-item cotton los angeles people art craft los angeles color quality" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-8.24.24-PM-p-500-2.png" width="340" height="300" />
                                  <p className="weight">Elma inspects the bedding for quality and construction.</p>
                                  <p className="filed_under">Quality Check • Los Angeles • Color</p>
                              </div>
                              <div className="element-item shangai tech inside craft people cotton cut fabric color" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-9.23.43-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">The long view: Partnership, precision, and creativity of our sample makers in action.</p>
                                  <p className="filed_under">Fabric • Cut and Sew • 100% Supima Cotton</p>
                              </div>
                              <div className="element-item color los angeles craft dyed dye los color tech" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-8.53.13-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">Sealed into small lots, color will be established to an incredibly precise degree.</p>
                                  <p className="filed_under">Color • Garment Dye • Dyed to Order</p>
                              </div>
                              <div className="element-item color tech los angeles inside tech color dye" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-8.48.08-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">By the numbers: Coded bottles of dye await programming instruction to create custom dye colors.</p>
                                  <p className="filed_under">Garment Dye • Los Angeles • Color • Tech</p>
                              </div>
                              <div className="element-item los angeles culture outside flaneur" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-9.14.44-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">Arrivals &amp; departures: a shipping facility in downtown L.A.</p>
                                  <p className="filed_under">Los Angeles • flâneur</p>
                              </div>
                              <div className="element-item color tech inside fresh people color dyed dye los" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-8.57.00-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">Blue and brown dye are needed to make a yellow shade.</p>
                                  <p className="filed_under">Garment Dye • Los Angeles • Dyed to Order</p>
                              </div>
                              <div className="element-item culture shanghai flaneur" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-9.24.08-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">Mildly grinded sticky rice bowl ready to be prepared for lunch or dinner.</p>
                                  <p className="filed_under">Shanghai • flâneur</p>
                              </div>
                              <div className="element-item cotton tech craft los angeles light quality mill golden" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-8.53.02-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">Fabric is weighed within an exclusive level of tolerance to ensure the highest quality of color.</p>
                                  <p className="filed_under">100% Supima Cotton • Tech • Quality Check</p>
                              </div>
                              <div className="element-item shanghai craft people inside soft light" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-9.24.41-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">Its a fine line between art and science: the cutting of sheets</p>
                                  <p className="filed_under">Cut and Sew • Fabric • 100% Supima Cotton</p>
                              </div>
                              <div className="element-item cotton los angeles light soft dye golden" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-8.47.40-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">The untouched beauty of sheets awaits your precise order.</p>
                                  <p className="filed_under">100% Supima Cotton • Dyed to Order</p>
                              </div>
                              <div className="element-item people cotton color tech inside people dyed dye" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-20-at-7.49.01-PM-p-500.png" width="573" width="340" height="300" />
                                  <p className="weight">Dyed one piece a time, bedding is then removed to be gently tumbled in the dryer.</p>
                                  <p className="filed_under">Garment Dye • Color • Dyed to Order</p>
                              </div>

                              <div className="element-item soft cotton california outside golden" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-9.13.51-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">Where it all begins: A close up of Supima cotton balls in Californias November sunshine.</p>
                                  <p className="filed_under">100% Supima Cotton • Golden Sheen • Soft </p>
                              </div>
                              <div className="element-item color tech craft dye los" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-8.52.50-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">The complete control of color via central machine processing and oversight.</p>
                                  <p className="filed_under">Los Angeles • Garment Dye • Tech • Color</p>
                              </div>
                              <div className="element-item craft color people soft los fabric color quality" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-9.14.21-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">The art of accuracy: One by one, a single lot is compared to Flaneurs color standard to ensure a meticulous match.</p>
                                  <p className="filed_under">Color • Fabric • Quality Check </p>
                              </div>
                              <div className="element-item los angeles culture outside color flaneur" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/R0010357.JPG" width="340" height="300" />
                                  <p className="weight">Quiet backyard and charming companion in downtown L.A.</p>
                                  <p className="filed_under">Los Angeles • flâneur • Color</p>
                              </div>
                              <div className="element-item color cotton craft dye dyed color los" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-8.54.20-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">The careful removal of excess color to create a lab dip swatch.</p>
                                  <p className="filed_under">Garment Dye • Dyed to Order • Color</p>
                              </div>
                              <div className="element-item color tech craft people los quality" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-8.58.02-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">The top score for color fastness has been achieved—no crocking/wearing off.</p>
                                  <p className="filed_under">Los Angeles • Quality Check • Color • Tech</p>
                              </div>
                              <div className="element-item shanghai outside culture flaneur color" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-9.24.18-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">A glimpse into the timeworn 17th century courtyard of a prominent Asian scholar.</p>
                                  <p className="filed_under">Shanghai • flâneur • Color</p>
                              </div>
                              <div className="element-item shanghai culture inside flaneur color" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-9.24.04-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">A delectable countryside dish of pork, beans, and scallions simmered overnight.</p>
                                  <p className="filed_under">Shanghai • flâneur • Color</p>
                              </div>
                              <div className="element-item color culture outside shanghai water flaneur" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-9.23.55-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">Koi fish submerged punctuate the opacity of the water with color.</p>
                                  <p className="filed_under">Shanghai • flâneur • Color • Water</p>
                              </div>
                              <div className="element-item outside shanghai culture color water" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-9.23.51-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">Room with a water view: Personal perspective of famous calligrapher</p>
                                  <p className="filed_under">Shanghai • flâneur • Color • Water</p>
                              </div>
                              <div className="element-item art shanghai outside culture flaneur" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-9.24.27-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">Sculptured archways framed by lush greener offer an artistic and ponderous perspective.</p>
                                  <p className="filed_under">Shanghai • flâneur </p>
                              </div>
                              <div className="element-item cotton color fresh craft los angeles inside dyed dye" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-8.56.51-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">Awash in color, bedding is transformed into a custom ordered creation.</p>
                                  <p className="filed_under">Los Angeles • Garment Dye • Dyed to Order</p>
                              </div>
                              <div className="element-item cotton craft people shanghai golden mill weave" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-9.34.27-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">Patience and focus are required to comb through the thread as it is spun for quality</p>
                                  <p className="filed_under">100% Supima Cotton • Golden Sheen • Weave</p>
                              </div>
                              <div className="element-item cotton light tech shanghai golden mill weave" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-9.34.31-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">The fine threads of cotton being pulled through the machine</p>
                                  <p className="filed_under">100% Supima Cotton • Mill • Weave</p>
                              </div>
                              <div className="element-item color los angeles inside tech los dye color dyed" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-8.51.21-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">The color lineup of fabric, before the magic begins.</p>
                                  <p className="filed_under">Los Angeles • Garment Dye • Dyed to Order</p>
                              </div>
                              <div className="element-item people craft color tech cotton los dye" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-8.55.25-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">Meticulous testing for color fastness, one swatch at a time.</p>
                                  <p className="filed_under">Los Angeles • Garment Dye • Color </p>
                              </div>
                              <div className="element-item soft fresh people color cotton inside quality los dyed" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-20-at-7.48.00-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">After being gently hand-folded, the bedding is carefully placed into a box for immediate shipment.</p>
                                  <p className="filed_under">Los Angeles • Quality Check • Dyed to Order</p>
                              </div>
                              <div className="element-item tech craft cut shanghai" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-9.24.34-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">Tools of the trade: The pinpoint precision and accuracy required to create elevated bedding.</p>
                                  <p className="filed_under">Shanghai • Cut and Sew • Craft</p>
                              </div>
                              <div className="element-item culture shanghai art outside flaneur" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-9.24.22-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">A view of the cascading rooftops of a renowned calligrapher.</p>
                                  <p className="filed_under">flâneur • Shanghai</p>
                              </div>
                              <div className="element-item tech craft inside dye" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-8.51.13-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">The machine behind the poetic art of weaving.</p>
                                  <p className="filed_under">Los Angeles • Garment Dye </p>
                              </div>
                              <div className="element-item art culture outside flaneur los" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-9.15.34-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">Art &amp; Inspiration: Street mural in L.A.</p>
                                  <p className="filed_under">flâneur • Los Angeles</p>
                              </div>
                              <div className="element-item craft tech color los quality" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-9.14.31-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">The science of color matching: A swatch awaits meticulous review in a lightbox.</p>
                                  <p className="filed_under">Quality Check • Los Angeles • Color</p>
                              </div>
                              <div className="element-item craft color inside dye los" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-8.51.03-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">After small batch dyeing, the fastidious clean up begins.</p>
                                  <p className="filed_under">Garment Dye • Los Angeles • Color</p>
                              </div>

                              <div className="element-item people craft fabric flaneur shanghai cut" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-9.23.39-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">Close up perspective of a sample maker marking lines for absolute precision.</p>
                                  <p className="filed_under">Shanghai • Cut and Sew • Craft </p>
                              </div>
                              <div className="element-item flaneur los " data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-9.14.49-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">From here to there: A railroad perspective near factories in L.A.</p>
                                  <p className="filed_under">flâneur • Los Angeles</p>
                              </div>
                              <div className="element-item los angeles flaneur culture outside" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-9.14.36-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">Objects in the mirror are closer than they appear: On the road in Venice Beach, California</p>
                                  <p className="filed_under">flâneur • Los Angeles</p>
                              </div>

                              <div className="element-item fresh soft light cotton mill weave golden" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-9.34.12-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">The golden beauty of raw Supima cotton meets the dull white face of Australian cotton.</p>
                                  <p className="filed_under">100% Supima Cotton • Golden Sheen • Mill</p>
                              </div>
                              <div className="element-item outside culture los angeles art flaneur" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-9.16.00-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">A perspective of the street scene in L.A.</p>
                                  <p className="filed_under">flâneur • Los Angeles</p>
                              </div>
                              <div className="element-item tech color people craft dyed dye los" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-8.25.11-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">After dyeing, a worker pays particular attention to the gentle tumble of drying sheets.</p>
                                  <p className="filed_under">Garment Dye • Dyed to Order • Los Angeles</p>
                              </div>

                              <div className="element-item culture flaneur los angeles outside" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-9.14.53-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">On the move: A tractor trailer pulls away from a facility in downtown L.A.</p>
                                  <p className="filed_under">flâneur • Los Angeles</p>
                              </div>
                              <div className="element-item color dye los angeles" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-8.55.01-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">Stacks of color, chromatic brilliance in its simplest form.</p>
                                  <p className="filed_under">Color • Garment Dye • Blue • Los Angeles</p>
                              </div>
                              <div className="element-item fresh cotton tech inside golden weave mill" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-9.33.57-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">Fine and combed, the yarn is ready for its next transformative step into thread.</p>
                                  <p className="filed_under">100% Supima Cotton • Mill • Weave</p>
                              </div>

                              <div className="element-item tech color craft people los dye" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-8.53.26-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">Fabric becomes immersed in color, one by one.</p>
                                  <p className="filed_under">Garment Dye • Color • Los Angeles • Tech</p>
                              </div>
                              <div className="element-item people craft fresh soft dyed quality los angeles" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-8.47.22-PM-p-500-2.png" width="340" height="300" />
                                  <p className="weight">Signed, sealed, and (almost) delivered. The order is on its way.</p>
                                  <p className="filed_under">Quality Check • Los Angeles • Dyed to Order</p>
                              </div>
                              <div className="element-item outside los angeles culture flaneur" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/R0010353.JPG" width="340" height="300" />
                                  <p className="weight">Walking through L.A., taking the scenic route.</p>
                                  <p className="filed_under">flâneur • Los Angeles</p>
                              </div>

                              <div className="element-item culture outside los angeles flaneur" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-9.14.58-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">In the neighborhood: A working factory near the L.A. dye house.</p>
                                  <p className="filed_under">flâneur • Los Angeles</p>
                              </div>
                              <div className="element-item art culture outside los angeles flaneur" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-9.15.50-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">"Are you really ready to cross?" A good question for railroad tracks, and creative pursuits.</p>
                                  <p className="filed_under">flâneur • Los Angeles</p>
                              </div>
                              <div className="element-item tech craft people shanghai cotton" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-9.24.31-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">Art in action: The meticulous construction of a French seam.</p>
                                  <p className="filed_under">Craftsmanship • Tech • 100% Supima Cotton</p>
                              </div>
                              <div className="element-item culture outside shanghai people cut flaneur" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-9.33.52-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">Work done, art and magic created, its time to rest, relax, and get inspired once again.</p>
                                  <p className="filed_under">Shanghai • flâneur • Cut and Sew </p>
                              </div>

                              <div className="element-item cotton fresh quality tech" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-9.34.19-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">Raw cotton weight assessment—does it meet the standards?</p>
                                  <p className="filed_under">Quality Check • Fabric • Fresh • Tech</p>
                              </div>

                              <div className="element-item culture los angeles flaneur" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/R0010347.JPG" width="340" height="300" />
                                  <p className="weight">The stage is (nearly) always set for action in L.A.</p>
                                  <p className="filed_under">Los Angeles • flâneur</p>
                              </div>

                              <div className="element-item cotton soft fresh golden mill weave" data-category="metalloid">
                                  <img className="grid_image" src="https://fr-assets.com/images/Screen-Shot-2018-06-15-at-9.34.07-PM-p-500.png" width="340" height="300" />
                                  <p className="weight">Before the magic and the science, these are the raw materials.</p>
                                  <p className="filed_under">100% Supima Cotton • Soft • Golden Sheen</p>
                              </div>
                          </div>

                      </div>
                      <div className="content-section account-list">
      <div className="helpcontinerholder">
        <div className="helpful-container w-container">
          <div>
            <h3 className="content-page-title">Contact Flaneur</h3><img src="https://fr-assets.com/images/line6.png" width="1440" className="image-52"/></div>
          <div className="w-row">
            <div className="w-col w-col-4">
              <div>
                <h5 className="heading-8">Questions?</h5>
                <div className="text-block-34">Try your questions on our <a href="/pages/faqs" className="link">FAQs</a>.</div>
              </div>
            </div>
            <div className="w-col w-col-4">
              <div>
                <h5 className="heading-8"><a href="#" onClick={()=>{ Intercom('show'); }}>Chat</a> with us.</h5>
                <div className="text-block-34">We usually get back to you in a few minutes.</div>
              </div>
            </div>
            <div className="w-col w-col-4">
              <div>
                <h5 className="heading-8">Send us an <a href="mailto:support@hiflaneur.com">email</a>.</h5>
                <div className="text-block-34">We usually get back to you in 24 hours.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
                  </div>
              </div>
          </div>
      </div>
      </div>
    );
  }
}
