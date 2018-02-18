import vue from "rollup-plugin-vue";

export default {
    input: "src/index.js",
    output: {
    name: "HumanTyping",
    file: 'bundle.js',
    format: 'umd'
  },
  plugins: [
    vue({
      compileTemplate: true,
      css: false     
    })    
  ]
};
