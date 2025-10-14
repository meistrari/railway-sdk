import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    "ts/consistent-type-definitions": ["error", "type"]
  },
})
