(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.HumanTyping = factory());
}(this, (function () { 'use strict';

var HumanTyping = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',[_c('span',{class:_vm.className,domProps:{"innerHTML":_vm._s(_vm.typedText)}})])},staticRenderFns: [],
  name: 'human-typing',
  props: {
    text: {
      type: [String, Array],
    },
    className: {
      type: String,
    },
    options: {
      type: Object,
    },
  },
  data() {
    return {
      originalText: this.text,
      textArray: [],
      typedText: '',
      typingOptions: {},
    };
  },
  computed: {
    setTypingOptions() {
      return Object.assign(
        {
          speed: 200,
          speedDeviation: 50,
          delay: 250,
        },
        this.options,
      );
    },
    textIntoArray() {
      let originalText = this.originalText;
      if (typeof originalText === 'string') {
        originalText = [originalText];
      }

      // Deep cloning
      return JSON.parse(JSON.stringify(originalText));
    },
  },
  methods: {
    HumanTyping(textArray) {
      const self = this;
      const delay = this.typingOptions.delay;
      const speed = this.typingOptions.speed;
      const speedDeviation = this.typingOptions.speedDeviation;

      function addCharacter(character) {
        self.typedText += character;
      }

      function gaussianDistribution(mu = 0, sigma = 1) {
        const nsamples = 6;

        let runTotal = 0;
        for (let i = 0; i < nsamples; i += 1) {
          runTotal += Math.random();
        }

        return sigma * (runTotal - nsamples / 2) / (nsamples / 2) + mu;
      }

      function typeText(string) {
        if (string.length > 0) {
          const humanTypingDelay = gaussianDistribution(speed, speedDeviation);

          addCharacter(string[0]);

          setTimeout(() => typeText(string.substr(1)), humanTypingDelay);
        } else if (textArray.length > 0) {
          self.typedText += '<br/>';
          setTimeout(() => typeText(textArray.shift()), delay);
        }
      }

      setTimeout(() => typeText(textArray.shift()), delay);
    },
    handleTextTyping() {
      if (typeof this.text !== 'undefined') {
        this.typingOptions = this.setTypingOptions;
        this.textArray = this.textIntoArray;
        this.HumanTyping(this.textArray);
      }
    },
  },
  mounted() {
    this.handleTextTyping();
  },
};

return HumanTyping;

})));
