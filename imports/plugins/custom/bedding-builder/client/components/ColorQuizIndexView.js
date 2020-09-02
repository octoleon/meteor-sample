import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ColorHousesOption from './ColorHousesOption';

export default class ColorQuizIndexView extends Component {

  static propTypes = {
    onHaveClick: PropTypes.func.isRequired,
    onHelpClick: PropTypes.func.isRequired,
    onUploadClick: PropTypes.func.isRequired,
    onColorQuiz21Click: PropTypes.func.isRequired,
    onEnterPantoneClick: PropTypes.func.isRequired
  }

  render () {
    const { onHaveClick, onHelpClick, onUploadClick, onEnterPantoneClick, onColorQuiz21Click } = this.props;

    return (
      <div className="view">
        <div className="bedding-builder-section whiteout">

          <div className="div-block-39">
            <div className="div-block-9">
              <div className="div-block-17-no-tooltip">
                <h1 className="heading-3-no-tooltip-2">Hello quiz?</h1>
              </div>
              <div className="div-block-19">
                <div className="text-block-15">Select one.</div>
              </div>
            </div>
            <div className="bedding-container-whole w-container">
              <div className="bedding-builder-holder">
                <div className="row-bedding w-row">
                  <div className="bedding-builder-3-column w-col w-col-1 w-col-stack"></div>
                  <div className="bedding-builder-3-column w-col w-col-3 w-col-stack">
                    <div className="bedding-builder-containerblock" onClick={onColorQuiz21Click}> hello !
                    </div>
                  </div>
                  <div className="bedding-builder-3-column w-col w-col-4 w-col-stack">
                  <div className="bedding-builder-containerblock" onClick={onColorQuiz21Click}> hi !
                  </div>
                </div>
                  <div className="bedding-builder-3-column w-col w-col-3 w-col-stack">
                  <div className="bedding-builder-containerblock" onClick={onColorQuiz21Click}> whats up !
                  </div>
                </div>
                  <div className="bedding-builder-3-column w-col w-col-1 w-col-stack"></div>
           </div>

              </div>
            </div>
          </div>
          <div className="help-block w-container">
            <div className="row-28 w-row">
              <div className="column-22 w-col w-col-4">

              </div>
              <div className="column-22 w-col w-col-4">
          </div>
              <div className="column-22 w-col w-col-4">

              </div>
            </div>
          </div>

        </div>


      </div>




    );
  }
}
