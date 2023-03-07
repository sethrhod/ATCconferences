import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";

export default function CodeOfConduct() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{alignItems: "center", justifyContent: "center", padding: 20}}>
        <Text style={styles.p}>
          All attendees, speakers, sponsors and volunteers at our conference are
          required to agree with the following code of conduct. Organisers will
          enforce this code throughout the event. We expect cooperation from all
          participants to help ensure a safe environment for everybody.
        </Text>
        <Text style={styles.header}>Need Help?</Text>
        <Text style={styles.p}>
          You have our contact details in the emails we've sent you.
        </Text>
        <Text style={styles.header}>The Quick Version</Text>
        <Text style={styles.p}>
          Our conference is dedicated to providing a harassment-free conference
          experience for everyone, regardless of gender, gender identity and
          expression, age, sexual orientation, disability, physical appearance,
          body size, race, ethnicity, religion (or lack thereof), or technology
          choices. We do not tolerate harassment of conference participants in any
          form. Sexual language and imagery is not appropriate for any conference
          venue, including talks, workshops, parties, Twitter and other online
          media. Conference participants violating these rules may be sanctioned
          or expelled from the conference without a refund at the discretion of
          the conference organisers.
        </Text>
        <Text style={styles.header}>The Less Quick Version</Text>
        <Text style={styles.p}>
          Harassment includes offensive verbal comments related to gender, gender
          identity and expression, age, sexual orientation, disability, physical
          appearance, body size, race, ethnicity, religion, technology choices,
          sexual images in public spaces, deliberate intimidation, stalking,
          following, harassing photography or recording, sustained disruption of
          talks or other events, inappropriate physical contact, and unwelcome
          sexual attention. Participants asked to stop any harassing behavior are
          expected to comply immediately. Sponsors are also subject to the
          anti-harassment policy. In particular, sponsors should not use
          sexualised images, activities, or other material. Booth staff (including
          volunteers) should not use sexualised clothing/uniforms/costumes, or
          otherwise create a sexualised environment. If a participant engages in
          harassing behavior, the conference organisers may take any action they
          deem appropriate, including warning the offender or expulsion from the
          conference with no refund. If you are being harassed, notice that
          someone else is being harassed, or have any other concerns, please
          contact a member of conference staff immediately. Conference staff can
          be identified as they'll be wearing branded clothing and/or badges.
          Conference staff will be happy to help participants contact hotel/venue
          security or local law enforcement, provide escorts, or otherwise assist
          those experiencing harassment to feel safe for the duration of the
          conference. We value your attendance. We expect participants to follow
          these rules at conference and workshop venues and conference-related
          social events. This Code of Conduct is borrowed from Conference Code of
          Conduct.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    color: "#DBE9EE"
  },
  p: {
    fontSize: 16,
    margin: 20,
    textAlign: "left",
    color: "#C0D6DF"
  },
});
