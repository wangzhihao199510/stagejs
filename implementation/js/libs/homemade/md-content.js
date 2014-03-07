/**
 * This is the jquery plugin that fetch and show static .md contents through markd js lib
 *
 * Usage
 * =====
 * ```
 * $.md({
 * 	url: ...
 * 	marked: marked options see [https://github.com/chjj/marked]
 *
 *  cb: function($el)...
 * })
 * ```
 *
 * the $(tag) you used to call .md() can have md="..." or data-md="..." attribute to indicate md file url.
 *
 * Note
 * ====
 * Use $.load() if you just want to load html content instead of md coded content into $(tag)
 *
 * @author Tim.Liu
 * @created 2013.11.05
 * @updated 2014.03.02
 */

(function($){

	/*===============the util functions================*/
	function theme($el){
		$el.find('h3').addClass('text-primary');
		$el.find('code').addClass('text-info');
		$el.find('h1 > p').addClass('text-info');
	}

	function toc(memo, $el){
		
	}

	/*===============the plugin================*/
	$.fn.md = function(options){
		var that = this;
		if(_.isString(options)) options = { url: options };
		options = options || {};

		return this.each(function(index, el){
			var $el = $(el);
			var url = options.url || $el.attr('md') || $el.data('md');
			$.get(url).done(function(res){
				$el.html(marked(res, options.marked)).addClass('md-content');
				theme($el);
				options.cb && options.cb($el);
			});
		});
	}

	//store table-of-content listing in data-toc
	$.fn.toc = function(){
		return this.each(function(index, el){
			var $el = $(el);
			
		});
	}

})(jQuery);