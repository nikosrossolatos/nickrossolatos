export class SortValueConverter {
  toView(array, propertyName, direction) {
  	if(!array){
  		return;
  	}
    var factor = direction === 'descending' ? -1 : 1;
    return array
      .slice(0)
      .sort((a, b) => {
        return (new Date(b.last_active) - new Date(a.last_active)) * factor
      });
  }
}