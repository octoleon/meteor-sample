import { Template } from 'meteor/templating';
import ColorQuizContainer from '../containers/ColorQuizContainer';

Template.colorQuiz.helpers({
  ColorQuizContainer () {
    return ColorQuizContainer;
  }
})
