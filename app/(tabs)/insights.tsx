import React from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSession } from "@/hooks/ctx";
import { useRouter } from "expo-router";
import {
  BarChart,
  LineChart,
  PieChart,
  PopulationPyramid,
  RadarChart,
} from "react-native-gifted-charts";
import baseUrl from "@/utils/baseUrl";
import { authJson } from "@/utils/api";

// ...
const dataX = [
  { value: 50, text: "Food" },
  { value: 80 },
  { value: 90 },
  { value: 70 },
];

export default function Insights() {
  const { user, session, isLoading, signOut } = useSession();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<any>({});

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const { res, data } = await authJson(`${baseUrl}/analytics`, {
        method: "GET",
      });
      if (res.ok) {
        setData(data?.data ?? null);
        console.log("income ====",data?.data.income);
      } else if (res.status === 401) {
        signOut();
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      signOut();
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (session) fetchAnalytics();
  }, [session,]);

  React.useEffect(() => {
    if (!isLoading && !session) {
      router.replace({ pathname: "/sign-in" });
    }
  }, [isLoading, session, loading]);

  if (isLoading) {
    return (
      <SafeAreaView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <View style={{ flex: 1, padding: 0, backgroundColor: "whitesmoke" }}>
      <View
        style={{
          paddingVertical: 13,
          paddingHorizontal: 20,
          backgroundColor: "white",
          borderBlockColor: "whitesmoke",
          borderBottomWidth: 1,
          marginBottom: 10,
          elevation: 2,
        }}
      >
        <Text style={{ fontSize: 25, fontWeight: "700" }}>Insights</Text>
      </View>

      {data.income && <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, paddingHorizontal: 20 }}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
            marginBottom: 20,
            alignItems: "center",
            gap: 10,
            elevation: 2,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Income Chart</Text>
          <PieChart
            data={data? data.income : []}
            donut
            showTooltip
            showText
            textColor="white"
            radius={100}
            innerRadius={60}
            textSize={15}
            
          />

           <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginTop: 20,
                flexWrap: 'wrap',
              }}>
              {data?.income?.map((item: any, index: number) => (
                <View
                  key={index}
                  style={{ alignItems: 'center' }}
                >
                  <View
                    style={{
                      width: 13,
                      height: 13,
                      backgroundColor: item.color,
                      borderRadius: 4,
                      marginBottom: 5,
                    }}
                  />
                  <Text style={{fontSize: 10, textTransform: "capitalize"}}>{item.label}</Text>
                </View>
              ))}
            </View>
        </View>

{/*  */}
  <View
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
            marginBottom: 20,
            alignItems: "center",
            gap: 10,
            elevation: 2,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Expense Chart</Text>
          <PieChart
            data={data? data.expense : []}
            donut
            showTooltip
            showText
            textColor="white"
            radius={100}
            innerRadius={60}
            textSize={15}
            
          />

           <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginTop: 20,
                flexWrap: 'wrap',
              }}>
              {data?.expense?.map((item: any, index: number) => (
                <View
                  key={index}
                  style={{ alignItems: 'center' }}
                >
                  <View
                    style={{
                      width: 13,
                      height: 13,
                      backgroundColor: item.color,
                      borderRadius: 4,
                      marginBottom: 5,
                    }}
                  />
                  <Text style={{fontSize: 10, textTransform: "capitalize"}}>{item.label}</Text>
                </View>
              ))}
            </View>
        </View>
{/*  */}

       
      </ScrollView>}
    </View>
  );
}
