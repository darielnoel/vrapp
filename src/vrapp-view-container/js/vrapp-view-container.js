Y.namespace('VrApp');

var ATTR_CONTENTBOX = 'contentBox',
	ATTR_BOUNDINGBOX = 'boundingBox',

	MyContainer = Y.Base.create('vrapp-view-container', Y.Widget, [Y.WidgetParent], {

		/**
		 * Description
		 * @method initializer
		 * @param {} config
		 * @return 
		 */
		initializer: function () {
		},
		BOUNDING_TEMPLATE: '<div id="scroll"></div>',
		CONTENT_TEMPLATE: '<ul>\
							</ul>',

		/**
		 * Description
		 * @method renderUI
		 * @return 
		 */
		renderUI: function () {
			var instance = this,
				contentBox = instance.get(ATTR_CONTENTBOX);
		},

		bindUI: function(){
			var instance = this,
				boundingBox = instance.get(ATTR_BOUNDINGBOX);
			Y.one('.la li').set('innerHTML','joder');


			boundingBox.one('ul').on("gesturemovestart", function(e) {

			    var item = e.currentTarget,
			        target = e.target,
			        container = e.container,
			        MIN_SWIPE = 1,
			        gestureMoveHandle = instance.get('gestureMoveHandle');

			    if (gestureMoveHandle){
			    	gestureMoveHandle.detach();
			    }
			    item.setData("swipeStart", e.pageX);

			    gestureMoveHandle = item.on("gesturemove", function(e) {
			        var swipeStart = item.getData("swipeStart"),
			            swipeEnd = e.pageX,
			            isSwipeLeft = (swipeStart - swipeEnd) > MIN_SWIPE;

			        if (isSwipeLeft) {
			        	console.log('isSwipeLeft');
			            Y.one('.la li').set('innerHTML','swipeleft');
			            gestureMoveHandle.detach();
			            var liNode = boundingBox.one('#'+instance.get('viewIdCollection')[instance.get('activeView')]);
			            instance.hideLiUI(liNode, function(){
			            	console.log('ha acabado');
			            	console.log(instance.get('viewIdCollection'));
			            	liNode = boundingBox.one('#'+instance.get('viewIdCollection')[1]);
			            	console.log(liNode);
			            	instance.showLiUI(liNode, function(){
				            	console.log('ha acabado pinga');

				            });
			            }, 'hideEffect');
			        }

			    });

			    instance.set('gestureMoveHandle', gestureMoveHandle);


			    // item.once("gesturemoveend", function(e) {
			    //     var swipeStart = item.getData("swipeStart"),
			    //         swipeEnd = e.pageX,
			    //         isSwipeLeft = (swipeStart - swipeEnd) > MIN_SWIPE;

			    //     if (isSwipeLeft) {
			    //     	console.log('isSwipeLeft');
			    //        Y.one('.la li').set('innerHTML','swipeleft');
			    //     }

			    // });
			});

			// boundingBox.getDOMNode().onscroll = function(e){
			// 	console.log('nativo');
			// 	console.log(e);
			// 	Y.one('.la li').set('innerHTML',e.timeStamp);
			// };

			// boundingBox.on("scroll", function(e){
			// 	Y.one('.la li').set('innerHTML','Scroll'+ boundingBox.getDOMNode().scrollLeft+new Date());
			// 	console.log(e);
			// });

			// boundingBox.on("touchstart", function(){
			// 	Y.one('.la li').set('innerHTML','Se muevesss');
			// 	var scrollCaptureInterval = instance.get('scrollCaptureInterval');
			// 	if(scrollCaptureInterval){
			// 		scrollCaptureInterval.stop();
			// 	}
			// 	// scrollCaptureInterval = Y.later(200, Y, function(e){
			//  //        //console.log(scroller.scrollLeft);
			//  //        Y.one('.la li').set('innerHTML',new Date() + boundingBox.getDOMNode().scrollLeft);
			//  //    },{},true);
			// });

			// boundingBox.on("touchmove", function(e){
			// 	//Y.one('.la li').set('innerHTML','Se esta moviendo');
			// 	//Y.one('.la li').set('innerHTML',boundingBox.getDOMNode().scrollLeft);
			// 	boundingBox.getDOMNode().scrollLeft;
			// });
		
			boundingBox.on("touchend", function(e){
				Y.one('.la li').set('innerHTML',boundingBox.getDOMNode().scrollLeft);
				//console.log(boundingBox.getHTMLNode().scrollLeft);
				var scrollCaptureInterval = instance.get('scrollCaptureInterval');
				if(scrollCaptureInterval){
					scrollCaptureInterval.stop();
				}

			});
		},

		/**
		 * Description
		 * @method syncUI
		 * @return 
		 */
		syncUI: function () {
			var instance = this;
			instance.renderChilds(instance.get('childModelCollection'));
		},

		/**
		 * Description
		 * @method renderChilds
		 * @param {} data
		 * @return 
		 */
		renderChilds: function (childModelCollection) {
			var instance = this,
				contentBox = instance.get(ATTR_CONTENTBOX),
				itemsContainer = contentBox,
				childWidget,
				liNode = {},
				size = childModelCollection.length,
				i = 0,
				viewId = 'view';


			liNode = itemsContainer.appendChild('<li class="view-active" id="'+ viewId +'0"></li>');
			console.log(liNode);
			instance.set('activeView', 0);
			instance.get('viewIdCollection').push(viewId+0);


			Y.one('.loader').addClass('hidden');
				for (i; i < size; i++) {
					if(i !== 0 && i%6 === 0){
						console.log(i);
						liNode = itemsContainer.appendChild('<li class="view-hidden" id="'+ viewId +i +'"></li>');
						instance.get('viewIdCollection').push(viewId+i);
					}
					childWidget = new Y.VrApp.Item(childModelCollection[i]).render(liNode);
					instance.get('itemCollection').push(childWidget);
					if(i == 5 || (i == size-1 && i < 6)){
						childWidget.after('render',instance.showUI, instance);
					} else if (i >=5 ){
						childWidget.get('boundingBox').setStyle('opacity',1);
						childWidget.get('boundingBox').removeClass('hidden');
					}
					
				};				

			//I d'like remove html elements that can be used after
			//itemsContainer.one('.loader').addClass('hidden');


		},

		showUI: function(e){
			console.log('After render');
			console.log(e);
			//Y.AsyncQueue.defaults.timeout = -1;
			var instance = this,
				itemCollection = instance.get('itemCollection'),
				q = new Y.AsyncQueue(),
				size = itemCollection.length;

			for (var i = 0; i < itemCollection.length; i++) {
				itemCollection[i].showUI(function(){
				});
			}

		},

		showLiUI: function (liNode,callback)  {
			var instance = this,
				boundingBox = instance.get(ATTR_BOUNDINGBOX);

			console.log('showLiUI');
			console.log(liNode);
			liNode.replaceClass('view-hidden', 'view-active');
			liNode.setStyle('display', 'block');
			liNode.transition({
			    easing: 'ease-out',
			    duration: 0.3, // seconds
			    left: 0
			}, function() {
			    //boundingBox.setStyle('display', 'block');
			    if(callback){
			    	liNode.replaceClass('view-hidden', 'view-active');
			    	callback();	
			    }
			    
			});
		},

		hideLiUI: function (liNode, callback, hideEffect) {
			var instance = this,
				boundingBox = instance.get(ATTR_BOUNDINGBOX),
				leftPosition = '-100%';

			if(hideEffect === 'slideToRight'){
				leftPosition = '100%';
			}

			liNode.transition({
			    easing: 'ease-out',
			    duration: 0.3, // seconds
			    left: leftPosition
			}, function() {
				liNode.replaceClass('view-active', 'view-hidden');
			    liNode.setStyle('display', 'none');
			    if(callback){
			    	callback();	
			    }
			    
			});
		},

		syncData: function(data){

		},

		/**
		 * Description
		 * @method filterItems
		 * @param {} query
		 * @return 
		 */
		filterItems: function (query) {
			var instance = this,
				size = instance.size(),
				i = 0;
			for (i; i < size; i++) {
				instance.item(i).applyFilter(query);
			}

		}

	}, {
		ATTRS: {
			childModelCollection:{
				value: []
			},
			itemCollection: {
				value:[]
			},
			activeView:{
				value:''
			},
			viewIdCollection:{
				value:[]
			},
			gestureMoveHandle:{
				value:null
			}
		}

	});

Y.VrApp.Container = MyContainer;