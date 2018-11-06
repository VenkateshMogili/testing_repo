/**
 * MIT License
 *
 * Copyright (c) 2016 Juha Jantunen
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * @see https://www.strobotti.com/en/project/masonry
 */
(function ($) {
  $.fn.masonry = function (options) {
    var settings = $.extend({
      // These are the defaults.
      startOffset: 0, // meant for supporting lazy-loading more items
      rowMinAspectRatio: 3.5
    }, options);

    function getImgWidth(img) {
      return parseInt($(img).attr('width'));
    }

    function getImgHeight(img) {
      return parseInt($(img).attr('height'));
    }

    function getImgAspectRatio(img) {
      return getImgWidth(img) / getImgHeight(img);
    }

    // we're only interested in img-tags (and their direct parents)
    var imgs = $(this).find('img');

    var index = settings.startOffset;

    for (; index < imgs.length; index++) {
      // determine how many images should be put in a row
      var rowRealWidth = 0;
      var rowRealHeight = 0;
      var subIndex = index - 1;
      var imagesInRow = 1;

      // add images to row until the aspect ratio reaches (or exceeds) the given setting
      do {
        subIndex++;
        rowRealWidth += getImgWidth(imgs[subIndex]);
        rowRealHeight = Math.max(rowRealHeight, getImgHeight(imgs[subIndex]));

        imagesInRow = Math.max(imagesInRow, subIndex - index);
      } while (rowRealWidth / rowRealHeight < settings.rowMinAspectRatio && subIndex < imgs.length);

      if (imgs.length - (imagesInRow + index) == 1) {
        // don't leave an image alone
        if (imagesInRow > 2) {
          imagesInRow--;
        } else {
          imagesInRow++;
        }
      }

      var sumAspectRatios = 0;

      for (var i = 0; i < imagesInRow; i++) {
        sumAspectRatios += getImgAspectRatio(imgs[index + i]);
      }

      $(imgs[index]).css('clear', 'left');

      for (i = 0; i < imagesInRow; i++) {
        var width = (getImgAspectRatio(imgs[index + i]) / sumAspectRatios) * 100;

        // inline-block instead of block to prevent unwanted wrapping
        $(imgs[index + i]).css('width', width + '%')
          .css('height', 'auto')
          .css('float', 'left')
          .css('display', 'block')
      }

      index += (imagesInRow - 1);
    }

    return this;
  }
}(jQuery));
