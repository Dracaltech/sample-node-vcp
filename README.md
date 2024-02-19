# sample-node-vcp
Dracal // SDK code sample for Node on VCP

## Assumptions

Running this repository requires you to have installed:
- Node (version >= `18`)

Ideally, you've also installed `yarn` package manager:
```
npm install -g yarn
```

## Simple usage

Install dependencies
```
yarn  //you can also use `npm install` if you prefer
```

Run script
```
yarn start  //or `npm run start`
```

## Sample output
<img src="https://github.com/Dracaltech/sample-node-vcp/assets/1357711/305ff9ae-2d98-4485-99a6-d09c02523d1e" width=400 />

```
↑130 dracal/sample-node-vcp git:(develop) ▶ yarn start
yarn run v1.22.21
warning ../../../package.json: No license field
$ node -r @babel/register app.js
I,Product ID,Serial Number,Message,MS5611 Pressure,Pa,SHT31 Temperature,C,SHT31 Relative Humidity,%,*bbdd
2024-02-19, 12:47:22 p.m. VCP-PTH450-CAL E24638
MS5611 Pressure           102991 Pa
SHT31 Temperature         30.6 C
SHT31 Relative Humidity   55.64 %


2024-02-19, 12:47:23 p.m. VCP-PTH450-CAL E24638
MS5611 Pressure           102995 Pa
SHT31 Temperature         30.63 C
SHT31 Relative Humidity   55.64 %


2024-02-19, 12:47:24 p.m. VCP-PTH450-CAL E24638
MS5611 Pressure           102992 Pa
SHT31 Temperature         30.61 C
SHT31 Relative Humidity   55.65 %


2024-02-19, 12:47:25 p.m. VCP-PTH450-CAL E24638
MS5611 Pressure           102992 Pa
SHT31 Temperature         30.63 C
SHT31 Relative Humidity   55.65 %


^C
↑130 dracal/sample-node-vcp git:(develop) ▶
```
