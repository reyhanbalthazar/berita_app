import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, FlatList } from 'react-native';
import { Card, Image, Text } from 'react-native-elements';
import HeaderComp from '../components/HeaderComp';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import axios from 'axios';
import { Link } from 'react-router-native';

const API_URL = "https://newsapi.org/v2/top-headlines?sources=cnn&apiKey=99db49a12d4940cf9133f1ac9b9c24a5"
const HomePage = (props) => {
    const [kategori, setKategori] = useState([
        "Terbaru", "Teknologi", "Bisnis", "Nasional"
    ])
    const [selectedKategori, setSelectKategori] = useState(0)
    const [berita, setBerita] = useState([])

    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        getBerita()
    }, [])

    const getBerita = async () => {
        try {
            setRefresh(true)
            let res = await axios.get(API_URL)
            if (res.data.totalResults > 0) {
                setBerita(res.data.articles)
            }
            setRefresh(false)
        } catch (error) {
            console.log(error);
        }
    }

    const printKategori = () => {
        return kategori.map((value, index) => {
            return <Text style={selectedKategori == index ? desain.activeKategori : desain.kategori} key={index.toString()}>
                {value}
            </Text>
        })
    }

    const printBerita = () => {
        return berita.map((value, index) => {
            return (
                <Card key={index.toString()} containerStyle={{ margin: 0, marginBottom: hp(1), padding: 5 }}>
                    <View style={{ display: "flex", flexDirection: 'row', }}>
                        <Image style={{ width: 75, height: 75 }} source={{ uri: value.urlToImage }} />
                        <Text style={{ fontWeight: "800", padding: 8, width: "80%" }}>{value.title}</Text>
                    </View>
                </Card>
            )
        })
    }

    return (
        <View style={{ backgroundColor: "white" }}>
            <HeaderComp />
            <View style={desain.barKategori}>
                {printKategori()}
            </View>
            <View>
                <Image style={{ width: wp(100), height: hp(30) }} source={{ uri: "https://www.bankrate.com/2020/08/19164919/What-is-cryptocurrency.jpeg?auto=webp&optimize=high&crop=16:9" }} />
                <View style={{ paddingHorizontal: 12, paddingVertical: 8 }}>
                    <Text h4>Harga Cryptocurrency Meningkat</Text>
                    <Text style={{ textAlign: "justify", color: "gray" }}>
                        Menjelang sidang di House Financial Services Committee AS yang mulai pukul 10:00 EST,
                        para eksekutif telah mempersiapkan testimoni yang umumnya mendukung aturan yang lebih jelas.
                        Namun mereka juga akan menekankan bahwa aturan yang terlalu membatasi tidak akan melumpuhkan aktivitas. Sebaliknya, aturan keras hanya menjauhkan cryptocurrency dari jangkauan AS.
                    </Text>
                </View>
                <View style={{ marginHorizontal: -25, height: hp(45) }}>
                    {/* <ScrollView>
                        {printBerita()}
                    </ScrollView> */}
                    <View style={{ height: hp(40) }}>
                        <FlatList
                            data={berita}
                            renderItem={({ item }) => (
                                <Card containerStyle={{ marginBottom: hp(1), padding: 5 }}>
                                    <View style={{ display: "flex", flexDirection: 'row', }}>
                                        <Image style={{ width: 75, height: 75 }} source={{ uri: item.urlToImage }} />
                                        <View style={{ padding: 8, width: "75%" }}>
                                            <Text style={{ fontWeight: "700" }}>{item.title}</Text>
                                            <Link to={{
                                                pathname:"/detail",
                                                state:item
                                            }}>
                                                <Text style={{textAlign:"right", backgroundColor:"white"}}>Read More</Text>
                                            </Link>
                                        </View>
                                    </View>
                                </Card>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            refreshing={refresh}
                            onRefresh={getBerita}
                        />
                    </View>
                </View>
            </View>
        </View>
    ) 
}
const desain = StyleSheet.create({
    barKategori: {
        marginTop: -1.5,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: wp("2%"),
        backgroundColor: "#2d3436",
        paddingBottom: 10
    },
    activeKategori: {
        color: "white",
        fontWeight: "800",
        borderBottomWidth: 2,
        borderBottomColor: "white",
        paddingBottom: 5
    },
    kategori: {
        color: "gray",
        fontWeight: "400",
        paddingHorizontal: 16
    }
})
export default HomePage;