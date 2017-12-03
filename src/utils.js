import cssColorParser from './csscolorparser'

export const stats = (values) => {
    const sorted = values.slice().sort((a, b) => a - b)
    return {
        min: sorted[0],
        max: sorted[sorted.length - 1],
    }
}

export class ColorManager {
    // https://github.com/tmroyal/Chart.HeatMap
    constructor(min, max, colors, colorInterpolation='gradient', colorHighlightMultiplier=0.9) {
        const range = max - min
        this.base = min
        this.colorHighlightMultiplier = colorHighlightMultiplier
        if (colorInterpolation === 'gradient') {
            this.colorFunction = this.getGradientColor
            this.scaleFactor = (colors.length - 1) / (range - 1)
        } else {
            this.colorFunction = this.getIndexedColor
            this.scaleFactor = colors.length / (range + 1)
        }
        this.colors = colors.map(clr => this.cssColorToArray(clr))
    }
    rgbString(r, g, b, a) {
        r = Math.floor(this.clamped(r, 0, 255))
        g = Math.floor(this.clamped(g, 0, 255))
        b = Math.floor(this.clamped(b, 0, 255))
        a = this.clamped(a, 0, 255)
        return `rgba(${r},${g},${b},${a})`
    }
    clamped(n, min, max) {
        return Math.max(min, Math.min(n, max))
    }
    interp(v1, v2, x) {
        return v2 * x + v1 * (1 - x)
    }
    getGradientColor(colors, i, base, scaleFactor) {
        const fIndex = (i - base) * scaleFactor
        const iIndex = Math.floor(fIndex)
        const iv = fIndex - iIndex
        const iIndex1 = (iIndex + 1 > colors.length - 1) ? iIndex : iIndex + 1
        return {
            r: this.interp(colors[iIndex][0], colors[iIndex1][0], iv),
            g: this.interp(colors[iIndex][1], colors[iIndex1][1], iv),
            b: this.interp(colors[iIndex][2], colors[iIndex1][2], iv),
            a: this.interp(colors[iIndex][3], colors[iIndex1][3], iv),
        }
    }
    getIndexedColor(colors, i, base, scaleFactor) {
        const index = Math.floor((i - base) * scaleFactor)
        return {
            r: colors[index][0],
            g: colors[index][1],
            b: colors[index][2],
            a: colors[index][3],
        }
    }
    getScaledColor(val, scale) {
        val *= scale
        return val > 255 ? 255 : val
    }
    getHighlightColor(color, colorHighlightMultiplier) {
        return {
            r: this.getScaledColor(color.r, this.colorHighlightMultiplier),
            g: this.getScaledColor(color.g, this.colorHighlightMultiplier),
            b: this.getScaledColor(color.b, this.colorHighlightMultiplier),
            a: color.a,
        }
    }
    getColor(dataValue) {
        const clr = this.colorFunction(this.colors, dataValue, this.base, this.scaleFactor)
        const hclr = this.getHighlightColor(clr, this.colorHighlightMultiplier)
        return {
            color: this.rgbString(clr.r, clr.g, clr.b, clr.a),
            highlight: this.rgbString(hclr.r, hclr.g, hclr.b, hclr.a),
            text: this.getContrastYIQ(this.rgbaToHex(clr)),
        }
    }
    cssColorToArray(color) {
        return cssColorParser(color)
    }
    rgbaToHex(clr) {
        const r = parseInt(clr.r, 10).toString(16)
        const g = parseInt(clr.g, 10).toString(16)
        const b = parseInt(clr.b, 10).toString(16)
        return `#${r}${g}${b}`
    }
    // http://24ways.org/2010/calculating-color-contrast/
    getContrastYIQ(color) {
        const hex = (color.charAt(0) == "#") ? color.slice(1) : color
        const r = parseInt(hex.substr(0, 2), 16)
        const g = parseInt(hex.substr(2, 2), 16)
        const b = parseInt(hex.substr(4, 2), 16)
        const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000
        return (yiq >= 128) ? 'black' : 'white'
    }
}
