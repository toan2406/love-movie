import { fromJS } from 'immutable'

// Abstraction to handle pre-composedstate received from server
// (ie, leave top level keys untouched)
export default function immutifyState ({ obj, exclude }) {
  let objMut = { ...obj }

  Object
    .keys(objMut)
    .forEach(key => {
      if (!exclude.includes(key)) {
        objMut[key] = fromJS(objMut[key])
      }
    })

  return objMut
}
