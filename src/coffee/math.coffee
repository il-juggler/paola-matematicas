angular.module('math',['ngRoute','ngAnimate'])

.run(['$rootScope', ($rootScope) ->
	$rootScope.holaMundo = 'HOLA-MUNDO'
])

###
 [[2,5], [1,1,5]]
###

.directive('matSumPoints', ($parse) ->
	{
		link : (scope, jqElement, attrs) ->
			el     = jqElement[0]
			data   = $parse(attrs.matSumPoints)(scope)
			lienzo = d3.select(el).attr('width',600).attr('height',200)
			sum    = lienzo.selectAll('g.sumando').data(data)
			π = Math.PI

			translate = (x,y) -> 'translate('.concat(x,',',y,')')
			p_angle = d3.scale.linear().range([0,1.94*π ]).domain([0,16])

			gSumando = sum.enter()
				.append('g').attr 'class','sumando' 
					.attr('transform', (d,i) -> translate(100+i*200,100))

			gSumando.append('circle').attr('r', 0)
					.attr('cy', 0)
					.attr('cx', 0)
					.attr('r', 90)
					.attr('fill','rgba(90,180,90,0.3)')
					.attr('stroke','rgba(90,180,90,1)')
					.attr('stroke-width', 4)

			points = gSumando.selectAll('.point').data((d) -> Array d)

			points.enter()
				.append('circle').attr('class','point')
				  .attr('r', 3)
				  .attr('cx',(d,i) -> 40 * Math.sin(p_angle(i)) )
				  .attr('cy',(d,i) -> 40 * Math.cos(p_angle(i)) )
				  .attr('fill', 'none')
				  .attr('stroke', 'black')

			points.each((d, i) ->
				sle = d3.select(this)
					.attr('opacity',0)
				sle.transition().delay(i*50)
					.style('opacity', 0.2)
					.attr('r', 10)
					.transition()
						.attr('r', 19)
			)
				


	}
)

