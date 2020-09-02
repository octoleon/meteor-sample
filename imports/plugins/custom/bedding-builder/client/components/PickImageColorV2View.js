import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from "react-dom";
import ColorThief from '@cschear/color-thief';
import ColorLink from '/imports/plugins/custom/colors/client/components/ColorLink';
import handleSwatchbookAddClick from '/imports/plugins/custom/swatchbook/client/lib/handleSwatchbookAddClick';
import handleSwatchbookRemoveClick from '/imports/plugins/custom/swatchbook/client/lib/handleSwatchbookRemoveClick';
import { hexToPantone } from '../lib/hexToPantone';
import BackToUploadLink from './BackToUploadLink';
import BackToUploadV2Link from './BackToUploadV2Link';
import ColorPicker from './ColorPicker';
import './PickImageColorView.less';
import ScrollableAnchor from 'react-scrollable-anchor';

const PREVIEW_SIZE = 30;
const MAX_PALETTES = 3;
const MAX_PANTONES = 1;

class PickImageColorV2View extends Component {
  static propTypes = {
    image: PropTypes.string,
    imageColors: PropTypes.array,
    onReplaceImageClick: PropTypes.func.isRequired,
    swatchbookColorIds: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      imageWidth: 0,
      imageHeight: 0,
      paletteMap: [],
      selected: 0
    };
  }
componentDidMount () {location.hash = 'color-finder';};
  componentWillMount () {
    const temp_colors = this.getLocalStorage('bedding-builder-temp-colors', '');
    if (temp_colors) {
      this.setState({
        imageWidth: temp_colors.imageWidth,
        imageHeight: temp_colors.imageHeight,
        paletteMap: temp_colors.paletteMap,
        selected: temp_colors.selected });
    }
  }

  getLocalStorage = (key, defaultValue) => {
    var value = window.localStorage.getItem(key);
    var decoded = JSON.parse(value);

    if (decoded) {
        return decoded;
    }

    return defaultValue;
  }

  setLocalStorage = (key, value) => {
    window.localStorage.setItem(
      key, JSON.stringify(value)
    );
  }

  matchRGB(rgb, pixelData, delta) {
    if (rgb.r === pixelData[0] &&
      rgb.g === pixelData[1] &&
      rgb.b === pixelData[2]) {
      return true;
    }

    if (delta === 0) {
      return false;
    }

    if (((rgb.r - delta) <= pixelData[0] && pixelData[0] <= (rgb.r + delta)) &&
      ((rgb.g - delta) <= pixelData[1] && pixelData[1] <= (rgb.g + delta)) &&
      ((rgb.b - delta) <= pixelData[2] && pixelData[2] <= (rgb.b + delta))) {
      return true;
    }

    return false;
  }

  matchPixel(pixelData, map, x, y, delta) {
    for (let key of Object.keys(map)) {
      const rgb = map[key];
      if (this.matchRGB(rgb, pixelData, delta)) {
        rgb.x = x;
        rgb.y = y;
        return key;
      }
    }

    return false;
  }

  rgbToHex(r, g, b) {
    return `#${this.padZero(r.toString(16), 2)}${this.padZero(g.toString(16), 2)}${this.padZero(b.toString(16), 2)}`;
  }

  hexToRgb(hex) {
    if (hex.indexOf('#') === 0) {
      hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
      hex =  this.padZero(hex, 6);
    }

    return {r: parseInt(hex.slice(0, 2), 16), g: parseInt(hex.slice(2, 4), 16), b: parseInt(hex.slice(4, 6), 16)}
  }

  isDark(color) {
    if (color) {
      const {r, g, b} = this.hexToRgb(color)
      const alpha = 1;
      return r * 0.2999 + g * 0.587 + b * 0.114 > 216 || alpha < 0.5;
    }
    return true;
  }

  invertColor(hex) {
    const {r, g, b} = this.hexToRgb(hex)
    return '#' + this.padZero((255 - r).toString(16)) + this.padZero((255 - g).toString(16)) + this.padZero((255 - b).toString(16));
  }

  padZero(str, len) {
    len = len || 2;
    const zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
  }

  getPantoneCodes(rgbList, callback) {
    const pantoneCodesList = rgbList.map((rgb) => {
      const matches = new hexToPantone(rgb, MAX_PANTONES);
      return matches.map(match => `${match} TCX`);
    });
    Meteor.call('Colors.getByPantoneCodesList', pantoneCodesList, (err, imageColorsList) => {
      if (err) {
        alert(err.reason);
      } else {
        callback(imageColorsList);
      }
    });
  }

  onPixelSelect = (pos) => {
    const canvas = ReactDOM.findDOMNode(this.imageCanvas);
    const context = canvas.getContext('2d');
    const { index, x, y } = pos;
    const pixelData = context.getImageData(x, y, 1, 1).data;

    const { paletteMap } = this.state;
    const color = this.rgbToHex(pixelData[0], pixelData[1], pixelData[2]);

    paletteMap[index].color = color;
    paletteMap[index].x = x;
    paletteMap[index].y = y;

    this.getPantoneCodes([color], (imageColorsList) => {
    if (imageColorsList && imageColorsList.length && imageColorsList[0] && imageColorsList[0][0]) {
      paletteMap[index].pantone = imageColorsList[0][0];
      this.setState({ paletteMap, selected: index });
      // Store colors temporarily to local storage
      this.setLocalStorage('bedding-builder-temp-colors', this.state);
    }
  });
  }

  onImageLoad = ({ target: img }) => {
    const { imageWidth } = this.state;
    if (imageWidth) {
      const canvas = ReactDOM.findDOMNode(this.imageCanvas);
      canvas.width = img.width;
      canvas.height = img.height;
      const context = canvas.getContext('2d');
      context.drawImage(img, 0, 0, img.width, img.height);
      return;
    }

    const colorThief = new ColorThief();
    const quality = 1;
    const palette = colorThief.getPalette(this.imageElem, MAX_PALETTES, quality);

    let id = 1;
    const tmpPaletteMap = {};
    palette.forEach((pal) => {
      tmpPaletteMap[`${id++}`] = {
        r: pal[0], g: pal[1], b: pal[2]
      };
    });

    const imageElem = ReactDOM.findDOMNode(this.imageElem);
    const canvas = ReactDOM.findDOMNode(this.imageCanvas);
    canvas.width = img.width;
    canvas.height = img.height;
    const context = canvas.getContext('2d');
    context.drawImage(img, 0, 0, img.width, img.height);

    this.imgData = context.getImageData(0, 0, img.width, img.height).data;

    const paletteMap = []

    let foundMatch = false;
    for (let delta = 0; delta < 50; delta++) {
      let x = -1;
      let y = 0;
      for (let i = 0; i < this.imgData.length; i += 4) {
        if (paletteMap.length >= MAX_PALETTES) {
          break;
        }

        x++;
        if (x >= img.width) {
          x = 0;
          y++;
        }

        const pixelData = [this.imgData[i], this.imgData[i + 1], this.imgData[i + 2], this.imgData[i + 3]];
        const key = this.matchPixel(pixelData, tmpPaletteMap, x, y, delta);

        if (key) {
          delete tmpPaletteMap[key];
          const pixelPalette = {}
          pixelPalette.color = this.rgbToHex(pixelData[0], pixelData[1], pixelData[2]);
          pixelPalette.x = x;
          pixelPalette.y = y;
          paletteMap.push(pixelPalette);

          if (paletteMap.length >= MAX_PALETTES) {
            this.getPantoneCodes(paletteMap.map(palette => palette.color), (imageColorsList) => {
              imageColorsList.forEach((imageColors, mapIndex) => {
                paletteMap[mapIndex].pantone = imageColors[0]
              });
              this.setState({
                imageWidth: imageElem.offsetWidth,
                imageHeight: imageElem.offsetHeight,
                paletteMap,
              });

              // Store colors temporarily to local storage
              this.setLocalStorage('bedding-builder-temp-colors', this.state);
            });
          }
        }
      }
    }
  }

  dominantCursors = () => {
    const { paletteMap, imageWidth, imageHeight } = this.state;
    return (
      paletteMap && paletteMap.map((palette, index) => {
        const { x, y, color } = palette;
        return (
          <ColorPicker
            key={index}
            _id={index}
            x={x}
            y={y}
            xmax={imageWidth}
            ymax={imageHeight}
            color={color}
            isDark={this.isDark(color) ? '' : 'dark'}
            onChange={this.onPixelSelect}
          />
        )
      })
    );
  }

  colorPickers = () => {
    const { paletteMap } = this.state;

    const swatchbookColorIds = Meteor.user().profile.swatchbookColorIds || [];
    return (
      <div
        key={`cp_container`}
        style={{ display: 'inline-block' }}
      >
        {
          paletteMap && paletteMap.map((palette, index) => {
            const { pantone } = palette;
            return (
              <ColorLink
                key={`${pantone._id}-${index}`}
                _id={pantone._id}
                name={pantone.name}
                hexCode={pantone.hexCode}
                slug={pantone.slug}
                pantoneCode={pantone.pantoneCode}
                pdpURL={pantone.pdpURL}
                isInSwatchbook={swatchbookColorIds.includes(pantone._id)}
                onSwatchbookAddClick={handleSwatchbookAddClick}
                onSwatchbookRemoveClick={handleSwatchbookRemoveClick}
              />
            )
          })
        }
      </div>
    );

  }

  render() {
    const {
      image,
      onReplaceImageClick,
      swatchbookColorIds
    } = this.props;

    const { imageWidth, imageHeight, paletteMap, selected } = this.state;

    return (
      <div>
      <ScrollableAnchor id={'section1'}>

      <div className="view">
    <div className="color-section">

      <div className="link-back">
        <BackToUploadV2Link {...this.props} />
      </div>
      <div className="div-block-39">
        <div className="container-2 w-container">
          <div>
            <div className="div-block-17 w-clearfix">
              <h1 className="heading-3-no-tooltip-2">Refine Your Color</h1>
            </div>
            <div className="div-block-19">
              <div className="text-block-15">Select the colors to view product colors</div>
            </div>
          </div>
          <div>
            <div className="div-block-9coo">
              <div className="div-block-15">
                <div style={{ display: 'block', width: '100%', verticalAlign: 'top' }}>


                  <div style={{ display: 'block' }}>
                    <div ref={elem=> this.imageContainer = elem} className="uploaded-image" style={{ position: 'relative', display: 'inline-block', width: imageWidth ? `${imageWidth}px` : '100%', height: `${imageHeight}px`, zIndex: 1 }} >
                      <img ref={elem=> this.imageElem = elem} src={image} id="picker-image" style={{ position: imageWidth ? 'absolute' : 'static', display: 'block', zIndex: 2, margin: imageWidth ? 'inherit' : '0 auto', maxWidth: '%', }} onLoad={this.onImageLoad}
                      />
                      <canvas ref={elem=> this.imageCanvas = elem} id="image-canvas" style={{ display: 'none' }}></canvas>
                      <div style={{ display: 'none', position: 'absolute', top: 0, right: 0, width: `${PREVIEW_SIZE}px`, height: `${PREVIEW_SIZE}px`, backgroundColor: paletteMap[selected] ? paletteMap[selected].color : 'white', border: '1px solid lightgray', zIndex: 2, }}
                      /> {this.dominantCursors()}
                    </div>
                  </div>
                </div>
                <div className="div-block-19">
                  <div className="text-block-115">Move the circles you see on the image around to select the color you want. Click on the color below to see how the bed sheets and duvets look in that color.</div>
                </div>
                <div className="block-pickers" style={{ display: 'inline-block' }}>
                  {this.colorPickers()}
                </div>
              </div>
              <div>
              <div className="btn-group image-buttons" style={{ clear: 'both' }}>
                <button className="replace btn btn-default" onClick={onReplaceImageClick}>Replace Image</button>

              </div>
              </div>
            </div>
          </div>
        </div>
</div>
      <div className="help-block w-container">
        <div className="row-28 w-row">
          <div className="column-22 w-col w-col-4">
            <div>
              <h1 className="heading-7">Chat with us</h1>
              <p className="paragraph-3">Our concierge is available to assist you with color selections and more. </p><a href="#" onClick={()=>{ Intercom('show'); }} className="side-button">Chat</a></div>
          </div>
          <div className="column-22 w-col w-col-4">
            <div>
              <h1 className="heading-7">Get color tips</h1>
              <p className="paragraph-3">Get practical expert color advice from interior design insiders.</p>
            </div><a href="/pages/using-color" className="side-button">See Color Tips</a></div>
          <div className="column-22 w-col w-col-4">
            <div>
              <h1 className="heading-7">Explore the blog</h1>
              <p className="paragraph-3">Read our blog for color inspiration, how-to guides, and much more. </p><a href="salon.hiflaneur.com" className="side-button">Go to Salon</a></div>
          </div>
        </div>
      </div>
    </div>

  </div>

</ScrollableAnchor>
</div>


    );
  }
}

export default withTracker(props => {
  const user = Meteor.user();

  if (user.profile) {
    const { swatchbookColorIds } = user.profile;

    return {
      swatchbookColorIds: swatchbookColorIds || []
    };
  } else {
    return {
      swatchbookColorIds: []
    };
  }

})(PickImageColorV2View);
