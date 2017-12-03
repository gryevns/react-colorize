import React from 'react'
import PropTypes from 'prop-types'
import * as utils from './utils'


class Heatmap extends React.Component {
    render() {
        const { data, colors } = this.props
        if (data.length == 0) return null
        const { min, max } = utils.stats([].concat.apply([], data))
        const manager = new utils.ColorManager(min, max, colors)
        return (
            <table>
                <tbody>
                    {data.map((row, i) => (
                        <tr key={`heatmap-row-${i}`}>
                            {row.map((item, i) => {
                                const values = manager.getColor(item)
                                const style = {
                                    color: values.text,
                                    backgroundColor: values.color,
                                }
                                return <td key={`heatmap-cell-${i}`} style={style}>{item}</td>
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
    readable: PropTypes.bool,
    colors: PropTypes.array,
}

Heatmap.defaultProps = {
    readable: true,
    colors: ["#E0FBFC", "#C2DFE3", "#9DB4C0", "#5C6B73", "#253237"],
}

export default Heatmap
