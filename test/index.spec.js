import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import Heatmap from '../src/index'


describe('<Heatmap />', () => {
    it('renders no component when no data', () => {
        const wrapper = shallow(<Heatmap data={[]} />)
        expect(wrapper.type()).to.equal(null)
    })
    it('renders expected rows and columns', () => {
        const tests = [
            { data: [[1]],                  expected: { columns: 1, rows: 1 } },
            { data: [[1, 1, 1]],            expected: { columns: 3, rows: 1 } },
            { data: [[1], [1]],             expected: { columns: 1, rows: 2 } },
            { data: [[1, 1, 1], [1, 1, 1]], expected: { columns: 3, rows: 2 } },
        ]
        tests.forEach(test => {
            const result = shallow(<Heatmap data={test.data} />)
            expect(result.find('tr')).to.have.length(test.expected.rows)
            expect(result.find('tr').first().find('td')).to.have.length(test.expected.columns)
        })
    })

})
