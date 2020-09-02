import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import clamp from 'clamp';

class ColorPicker extends React.Component {
  _isMounted = false;

  static propTypes = {
    children: PropTypes.node,
    _id: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    xmax: PropTypes.number.isRequired,
    ymax: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    isDark: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  change(pos) {
    if (!this._isMounted) return;
    const rect = this.getOwnBoundingRect();
    const { _id } = this.props;
    this.props.onChange({
      index: _id,
      x: clamp(pos.left, 0, rect.width) / rect.width * this.props.xmax,
      y: clamp(pos.top, 0, rect.height) / rect.height * this.props.ymax
    });
  }

  getOwnBoundingRect() {
    return ReactDOM.findDOMNode(this).getBoundingClientRect();
  }

  _dragStart = e => {
    e.preventDefault();
    if (!this._isMounted) return;
    const rect = this.getOwnBoundingRect();
    const x = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const y = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;

    const offset = {
      left: x - rect.left,
      top: y - rect.top
    };

    this.change(offset);

    // Handle interaction
    this.setState({
      start: { x: offset.left, y: offset.top },
      offset: { x, y }
    });

    window.addEventListener('mousemove', this._drag);
    window.addEventListener('mouseup', this._dragEnd);

    window.addEventListener('touchmove', this._drag);
    window.addEventListener('touchend', this._dragEnd);
  };

  _drag = e => {
    e.preventDefault();
    const { start, offset } = this.state;
    const top =
      (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) +
      start.y - offset.y;
    const left =
      (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) +
      start.x - offset.x;

    this.change({ top, left });
  };

  _dragEnd = () => {
    window.removeEventListener('mousemove', this._drag);
    window.removeEventListener('mouseup', this._dragEnd);

    window.removeEventListener('touchmove', this._drag);
    window.removeEventListener('touchend', this._dragEnd);
  };

  render() {
    const {
      children,
      x,
      y,
      xmax,
      ymax,
      isDark
    } = this.props;

    const top = Math.round(clamp(y / ymax * 100, 0, 100));
    const left = Math.round(clamp(x / xmax * 100, 0, 100));

    return (
      <div
        className="color-picker-container"
        onTouchStart={this._dragStart}
        onMouseDown={this._dragStart}
      >
        <div
          className="color-picker-box"
          style={{
            top: `${top}%`,
            left: `${left}%`
          }}
        >
          <div
            className={`color-picker ${isDark ? 'color-picker-dark' : ''}`}
            style={{
              background: `${this.props.color}`
            }}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default ColorPicker;
