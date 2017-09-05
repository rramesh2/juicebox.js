/*
 *  The MIT License (MIT)
 *
 * Copyright (c) 2016-2017 The Regents of the University of California
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
 * associated documentation files (the "Software"), to deal in the Software without restriction, including 
 * without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
 * copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the 
 * following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial 
 * portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING 
 * BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,  FITNESS FOR A PARTICULAR PURPOSE AND 
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY 
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 
 * THE SOFTWARE.
 *
 */

/**
 * Created by dat on 3/3/17.
 */

var hic = (function (hic) {

    hic.ColorScaleWidget = function (browser, $container) {

        var self = this,
            $label,
            $fa;

        this.browser = browser;

        this.$container = $('<div class="hic-colorscale-widget-container">');
        $container.append(this.$container);

        // colorScale chip
        $label = $('<div>');
        this.$container.append($label);
        // $label.text('Color Scale');

        // colorScale input
        this.$high_colorscale_input = $('<input type="text" placeholder="high">');
        this.$container.append(this.$high_colorscale_input);
        this.$high_colorscale_input.on('change', function(e){

            var value,
                numeric;

            value = $(this).val();
            numeric = value.replace(/\,/g, '');

            if (isNaN(numeric)) {
            } else {
                browser.updateColorScale(parseInt(numeric, 10))
            }
        });

        // -
        $fa = $("<i>", { class:'fa fa-minus', 'aria-hidden':'true' });
        $fa.on('click', function (e) {
            var value;

            value = browser.getColorScale().high / 2.0;
            self.$high_colorscale_input.val(value);
            browser.updateColorScale( value );

        });
        this.$container.append($fa);

        // +
        $fa = $("<i>", { class:'fa fa-plus', 'aria-hidden':'true' });
        $fa.on('click', function (e) {
            var value;

            value = browser.getColorScale().high * 2.0;
            self.$high_colorscale_input.val(value);
            browser.updateColorScale( value );

        });
        this.$container.append($fa);

        this.browser.eventBus.subscribe("MapLoad", this);
        this.browser.eventBus.subscribe("ColorScale", this);
    };

    hic.ColorScaleWidget.prototype.receiveEvent = function(event) {

        var colorScale;
        if (event.type === "MapLoad" || event.type === "ColorScale") {

            colorScale = Math.round( this.browser.getColorScale().high );

            this.$high_colorscale_input.val(igv.numberFormatter(colorScale));
        }

    };

    return hic;

})
(hic || {});
