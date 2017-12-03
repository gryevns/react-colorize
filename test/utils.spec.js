import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import * as utils from '../src/utils'

describe('utils', () => {
    it('stats returns minimum and maximum', () => {
        const values = [1, 2, 3]
        const result = utils.stats(values)
        expect(result).to.deep.equal({
            min: 1,
            max: 3,
        })
    })
})
