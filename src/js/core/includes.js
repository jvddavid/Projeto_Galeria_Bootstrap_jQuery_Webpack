/*
Author: João Victor David de Oliveira (j.victordavid2@gmail.com)
includes.js (c) 2021
Desc: description
Created:  2021-11-16T02:22:32.224Z
Modified: 2021-11-18T04:57:57.801Z
*/

import $ from 'jquery'

const loadHtmlSuccessCallbacks = [

]

export function onLoadHtmlSuccess(callback) {
    if (!loadHtmlSuccessCallbacks.includes(callback)) {
        loadHtmlSuccessCallbacks.push(callback)
    }
}

function loadIncludes(parent) {
    if (!parent) parent = 'body'
    $(parent).find('[wm-include]').each(function (i, e) {
        const url = $(e).attr('wm-include')
        $.ajax(
            {
                url,
                success(data) {
                    $(e).html(data)
                    $(e).removeAttr('wm-include')
                    loadHtmlSuccessCallbacks.forEach((callback) => callback(data))
                    loadIncludes(e)
                }
            }
        )
    })
}

loadIncludes()