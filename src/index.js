import React from 'react'
import PropTypes from 'prop-types'
import * as utils from './utils'


class Heatmap extends React.Component {
    process() {
        const { data, maximum, median, minimum, percent, readable, theme } = this.props
        const { minimum: themeMinimum, median: themeMedian, maximum: themeMaximum } = theme
        const { min, max, avg } = utils.stats([].concat.apply([], data))
        const _minimum = (minimum) ? minimum : min
        const _median = (median) ? median : avg
        const _maximum = (maximum) ? maximum : max

        return data.map(row => (
            row.map(value => {
                let ratio = (_median - value) / _median - min
                let color1 = null
                let color2 = null
                if (!percent && value <= _minimum) {
                    color1 = themeMinimum
                    color2 = themeMinimum
                } else if (!percent && value >= _maximum) {
                    color1 = themeMaximum
                    color2 = themeMaximum
                } else if (percent && ratio <= _minimum) {
                    color1 = themeMinimum
                    color2 = themeMinimum
                } else if (percent && ratio >= _maximum) {
                    color1 = themeMaximum
                    color2 = themeMaximum
                } else if (value < _median) {
                    ratio = Math.abs(ratio)
                    color1 = themeMinimum
                    color2 = themeMedian
                } else {
                    ratio = Math.abs(ratio)
                    if (ratio > 1) ratio = 1
                    color1 = themeMaximum
                    color2 = themeMedian
                }
                const color = utils.getColor(color1, color2, ratio)
                return {
                    background: color,
                    color: (readable) ? utils.getContrastYIQ(color) : "inherit",
                    value,
                }
            })
        ))
    }
    render() {
        const values = this.process()
        if (values.length == 0) return null
        return (
            <table>
                <tbody>
                    {values.map((row, i) => (
                        <tr key={`heatmap-row-${i}`}>
                            {row.map((item, i) => {
                                const style = {
                                    backgroundColor: item.background,
                                    color: item.color,
                                }
                                return <td key={`heatmap-cell-${i}`} style={style}>{item.value}</td>
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }
}

Heatmap.propTypes = {
    data: PropTypes.array.isRequired,
    minimum: PropTypes.number,
    median: PropTypes.number,
    maximum: PropTypes.number,
    percent: PropTypes.bool,
    readable: PropTypes.bool,
    theme: PropTypes.shape({
        minimum: PropTypes.string.isRequired,
        median: PropTypes.string.isRequired,
        maximum: PropTypes.string.isRequired,
    })
}

Heatmap.defaultProps = {
    minimum: undefined,
    median: undefined,
    maximum: undefined,
    percent: false,
    readable: true,
    theme: {
        minimum: "#C80000",
        median: "#FFFFFF",
        maximum: "#10A54A",
    },
}

export default Heatmap
