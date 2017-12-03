
export const stats = (values) => {
    let { min, max, sum } = { min: null, max: null, sum: 0 }
    for (var i = 0; i < values.length; i++) {
        if (!max || values[i] > max) {
            max = values[i]
        }
        if (!min || values[i] < min) {
            min = values[i]
        }
        sum = sum + values[i]
    }
    return { min, max, avg: sum / values.length }
}

export const getColor = (color1, color2, ratio) => {
    const hex = (x) => {
        const value = x.toString(16)
        return (value.length == 1) ? '0' + value : value
    }
    color1 = (color1.charAt(0) == "#") ? color1.slice(1) : color1
    color2 = (color2.charAt(0) == "#") ? color2.slice(1) : color2
    var r = Math.ceil(parseInt(color1.substring(0, 2), 16) * ratio + parseInt(color2.substring(0, 2), 16) * (1 - ratio))
    var g = Math.ceil(parseInt(color1.substring(2, 4), 16) * ratio + parseInt(color2.substring(2, 4), 16) * (1 - ratio))
    var b = Math.ceil(parseInt(color1.substring(4, 6), 16) * ratio + parseInt(color2.substring(4, 6), 16) * (1 - ratio))
    return "#" + (hex(r) + hex(g) + hex(b)).toUpperCase()
}

// http://24ways.org/2010/calculating-color-contrast/
export const getContrastYIQ = (color) => {
    const hex = (color.charAt(0) == "#") ? color.slice(1) : color
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000
    return (yiq >= 128) ? 'black' : 'white'
}
