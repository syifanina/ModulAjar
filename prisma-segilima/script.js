// Prisma Segilima - 7 Sisi | 15 Rusuk | 10 Sudut
(function() {
    const R=1.8, h=3.0, y1=-h/2, y2=h/2;

    function pv(i, y) {
        const a = (i*2*Math.PI/5) - Math.PI/2;
        return new THREE.Vector3(R*Math.cos(a), y, R*Math.sin(a));
    }
    const bot=[0,1,2,3,4].map(i=>pv(i,y1));
    const top=[0,1,2,3,4].map(i=>pv(i,y2));
    const [A1,B1,C1,D1,E1]=bot, [A2,B2,C2,D2,E2]=top;

    window.SHAPE_INFO = {
        count: { sisi: 7, rusuk: 15, sudut: 10 },
        info: {
            sisi:   "Prisma segilima memiliki <b>7 sisi</b>:<br>2 sisi alas (segi lima) + 5 sisi tegak (persegi panjang)",
            rusuk:  "Prisma segilima memiliki <b>15 rusuk</b>:<br>5 rusuk alas bawah + 5 rusuk alas atas + 5 rusuk tegak",
            sudut:  "Prisma segilima memiliki <b>10 titik sudut</b>:<br>5 titik di alas bawah + 5 titik di alas atas",
            jaring: "Jaring-jaring prisma segilima terdiri dari <b>2 segi lima</b> (alas & tutup) dan <b>5 persegi panjang</b> (sisi tegak). Tekan <b>Buka Jaring-Jaring</b>!"
        },
        faces: [
            { verts:[A1,B1,C1,D1,E1], color:0x48dbfb, name:"Sisi Alas Bawah" },
            { verts:[A2,B2,C2,D2,E2], color:0x0fbcf9, name:"Sisi Alas Atas" },
            { verts:[A1,B1,B2,A2], color:0xff6b81, name:"Sisi Tegak 1" },
            { verts:[B1,C1,C2,B2], color:0xffa502, name:"Sisi Tegak 2" },
            { verts:[C1,D1,D2,C2], color:0x2ed573, name:"Sisi Tegak 3" },
            { verts:[D1,E1,E2,D2], color:0xeccc68, name:"Sisi Tegak 4" },
            { verts:[E1,A1,A2,E2], color:0xa29bfe, name:"Sisi Tegak 5" },
        ],
        edges: [[A1,B1],[B1,C1],[C1,D1],[D1,E1],[E1,A1],[A2,B2],[B2,C2],[C2,D2],[D2,E2],[E2,A2],[A1,A2],[B1,B2],[C1,C2],[D1,D2],[E1,E2]],
        vertices: [...bot, ...top]
    };
})();
