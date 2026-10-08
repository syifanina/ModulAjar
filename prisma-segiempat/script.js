// Prisma Segiempat - 6 Sisi | 12 Rusuk | 8 Sudut
(function() {
    const w=2.0, d=2.0, h=2.8, hw=1.0, hd=1.0, hy=1.4;

    const A1=new THREE.Vector3( hw,-hy, hd);
    const B1=new THREE.Vector3(-hw,-hy, hd);
    const C1=new THREE.Vector3(-hw,-hy,-hd);
    const D1=new THREE.Vector3( hw,-hy,-hd);
    const A2=new THREE.Vector3( hw, hy, hd);
    const B2=new THREE.Vector3(-hw, hy, hd);
    const C2=new THREE.Vector3(-hw, hy,-hd);
    const D2=new THREE.Vector3( hw, hy,-hd);

    window.SHAPE_INFO = {
        count: { sisi: 6, rusuk: 12, sudut: 8 },
        info: {
            sisi:   "Prisma segiempat memiliki <b>6 sisi</b>:<br>2 sisi alas (persegi panjang) + 4 sisi tegak (persegi panjang)",
            rusuk:  "Prisma segiempat memiliki <b>12 rusuk</b>:<br>4 rusuk alas bawah + 4 rusuk alas atas + 4 rusuk tegak",
            sudut:  "Prisma segiempat memiliki <b>8 titik sudut</b>:<br>4 titik di alas bawah + 4 titik di alas atas",
            jaring: "Jaring-jaring prisma segiempat terdiri dari <b>2 persegi panjang alas</b> dan <b>4 persegi panjang sisi tegak</b>. Tekan <b>Buka Jaring-Jaring</b>!"
        },
        faces: [
            { verts:[A1,B1,C1,D1], color:0x48dbfb, name:"Sisi Alas Bawah" },
            { verts:[A2,B2,C2,D2], color:0x0fbcf9, name:"Sisi Alas Atas" },
            { verts:[A1,B1,B2,A2], color:0xff6b81, name:"Sisi Depan" },
            { verts:[C1,D1,D2,C2], color:0xffa502, name:"Sisi Belakang" },
            { verts:[A1,D1,D2,A2], color:0x2ed573, name:"Sisi Kanan" },
            { verts:[B1,C1,C2,B2], color:0xeccc68, name:"Sisi Kiri" },
        ],
        edges: [[A1,B1],[B1,C1],[C1,D1],[D1,A1],[A2,B2],[B2,C2],[C2,D2],[D2,A2],[A1,A2],[B1,B2],[C1,C2],[D1,D2]],
        vertices: [A1,B1,C1,D1,A2,B2,C2,D2]
    };
})();
