import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import * as utils from '../src/utils'

describe('utils', () => {
    it('stats returns minimum, median, and maximum', () => {
        const values = [1, 2, 3]
        const result = utils.stats(values)
        expect(result).to.deep.equal({
            min: 1,
            avg: 2,
            max: 3,
        })
    })
    it('color based on 1 ratio', () => {
        const result = utils.getColor('#FFFFFF', '#000000', 1)
        expect(result).to.equal('#FFFFFF')
    })
    it('color based on 0 ratio', () => {
        const result = utils.getColor('#FFFFFF', '#000000', 0)
        expect(result).to.equal('#000000')
    })
    it('color based on 0.5 ratio', () => {
        const result = utils.getColor('#FFFFFF', '#000000', 0.5)
        expect(result).to.equal('#808080')
    })
})
