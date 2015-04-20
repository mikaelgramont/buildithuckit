var Strut = function(width, thickness, currentAngle, offset, visibility, imageList) {
	this.thickness = thickness;
	this.imageList = imageList;
	this.mesh = this.createMesh(width, thickness);
	this.setVisible(visibility);
};
Strut.prototype = new Part();

Strut.prototype.createMesh = function(width, thickness) {
	var geometry = this.buildGeometry(width, thickness);
	var material = new THREE.MeshLambertMaterial({
        map: THREE.ImageUtils.loadTexture(this.imageList.getImageUrl('strut'))
    });
	var mesh = new THREE.Mesh(geometry, material);
	this.mesh = mesh;
	return mesh;
};

Strut.prototype.buildGeometry = function(width, thickness) {
	var geometry = new THREE.BoxGeometry(thickness, thickness, width);
	return geometry;
};

Strut.prototype.positionByAngle = function(radius, angle) {
	var offset = new THREE.Vector3(0, -radius - this.thickness/2, 0);
	var radiusYOffset = new THREE.Vector3(0, radius, 0);
	this.mesh.geometry.vertices.forEach(function(vertex) {
		// 1. Move all the points down by radius.
 		vertex.add(offset);
		// 2. Rotate them by angle.
 		var m4 = new THREE.Matrix4();
 		m4.set(
 			  Math.cos(-angle), Math.sin(-angle), 0, 0,
 			- Math.sin(-angle), Math.cos(-angle), 0, 0,
 			0, 0, 1, 0,
 			0, 0, 0, 1
 		);
 		vertex.applyMatrix4(m4);
		// 3. Move the position up by radius
 		vertex.add(radiusYOffset);
	});	
};

Strut.prototype.applyOffset = function(offset) {
	this.mesh.geometry.vertices.forEach(function(vertex) {
 		vertex.add(offset);
	});	
};