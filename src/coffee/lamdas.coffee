#Create a function that returns a particular property of its parameter.
#If that property is a function, invoke it (and pass optional params).
ƒ = (name) ->
  params = Array::slice.call(arguments,1)
  v = null
  (o) -> if typeof (v=o[name]) is 'function' then v.apply(o,params) else v
 
#Return the first argument passed in
I = (d) -> return d


@['Y'] = I
@['ƒ'] = ƒ
@['Fn']= ƒ