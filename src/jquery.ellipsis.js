(function($) {
    $.fn.ellipsis = function(options) {

        // デフォルトオプション
        var defaults = {
            'row' : 1, // 省略行数
            'char' : '…' // 省略文字
        };

        options = $.extend(defaults, options);

        this.each(function() {
	    // 原典のデータバインド
	    if (!$(this).attr('data-ellipsis')) {$(this).attr('data-ellipsis', $(this).text());}

            // 現在のテキストを取得
            var $this = $(this);
	    var data_ellipsis = $(this).attr('data-ellipsis');

	    $this.text(data_ellipsis);
	    var origHeight = $this.height();
            var text = $this.text();

            // 1行分の高さを取得
            $this.text('a');
            var rowHeight = $this.height();
            var targetHeight = rowHeight * options.row;

            if (origHeight <= targetHeight) {
                $this.text(data_ellipsis);
                return;
            }

            // Binary search for max length
            var start = 1;
            var end = data_ellipsis.length;

            while (start < end) {
                var length = Math.ceil((start + end) / 2);

                $this.text(text.slice(0, length) + options['char']);

                if ($this.height () <= targetHeight) {
                    start = length;
                } else {
                    end = length - 1;
                }
            }

            $this.text(text.slice(0, start) + options['char']);
        });

        return this;
    };
}) (jQuery);
