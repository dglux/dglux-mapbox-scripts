# DGLux Mapbox Scripts

These are to be used with the DGLux JavaScript block. They don't belong in the core DGLux experience, but they fill usecases that others may be looking for.

If you have any scripts you'd like to share with the DGLux
community, please follow the preset format and submit a
pull request!

License information is in LICENSE.md.

### polygon-circles

Script that transforms a DGLux table into GeoJSON with points
represented as polygonal circles. Useful for needing to use
extrude features with points, or for making circles of a fixed
measurement (feet, miles, etc).

Inputs:

- table: tabledata
- latField: string
- lngField: string
- radiusField?: string
- steps: number, default is 64
- radius: number, default is 0.2
- units: string, can be [miles, feet, kilometers, degrees, radians], default is kilometers
- addProperties: bool

Outputs:

- geojson: string