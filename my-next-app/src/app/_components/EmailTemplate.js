// /pages/api/send.ts

import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

export const EmailTemplate = async ({
 
  fileName,
  fileSize,
  fileType,
  baseUrl,
  emailToSend,
  userName,
  shortUrl,
}) => {
  // Ensure to await any asynchronous operations to resolve their values
  // Example: const userData = await fetchUserData(userId);

  const handleButtonClick = () => {
    window.location.href = `/f/${shortUrl}`;
  };

  // Example: Handle userData or other asynchronously fetched data here
  // const userFullName = userData.fullName || userName;

  return (
    <Html>
      <Head />
      <Preview>File received</Preview>
      <Body style={main}>
        <Container>
          <Section style={logo}>
            <Img src={`${baseUrl}/static/logo.png`} />
          </Section>

          <Section style={content}>
            <Row>
              <Img
                style={image}
                width={620}
                src={`${baseUrl}/static/yelp-header.png`}
              />
            </Row>

            <Row style={{ ...boxInfos, paddingBottom: "0" }}>
              <Column>
                <Heading
                  style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Hi {emailToSend?.split("@")[0]},
                </Heading>
                <Heading
                  as="h2"
                  style={{
                    fontSize: 26,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {userName} Shared a File with You
                </Heading>

                <Text style={paragraph}>
                  <b>File Name: </b>
                  {fileName}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>File Size: </b>
                  {fileSize}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>File Type: </b>
                  {fileType}
                </Text>
                <Text
                  style={{
                    color: "rgba(0, 0, 0, 0.5)",
                    fontSize: 14,
                    marginTop: -5,
                  }}
                >
                  *Access and download the file at your own risk!
                </Text>

                <Text style={paragraph}>
                  Now you can also share your files with Sonali.
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  Click below to download your file.
                </Text>
              </Column>
            </Row>

            <Row style={{ paddingTop: "0" }}>
              <Column style={containerButton} colSpan={2}>
                <Button style={button} onClick={handleButtonClick}>
                  Click here to Download
                </Button>
              </Column>
            </Row>
          </Section>

          <Section style={containerImageFooter}>
            <Img
              style={image}
              width={620}
              src={`${baseUrl}/static/yelp-footer.png`}
            />
          </Section>

          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "rgba(0, 0, 0, 0.7)",
            }}
          >
            © 2022 | Yelp Inc., 350 Mission Street, San Francisco, CA 94105,
            U.S.A. | www.yelp.com
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#fff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: 16,
};

const logo = {
  padding: "30px 20px",
};

const containerButton = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
};

const button = {
  backgroundColor: "#e00707",
  borderRadius: 3,
  color: "#FFF",
  fontWeight: "bold",
  border: "1px solid rgba(0, 0, 0, 0.1)",
  cursor: "pointer",
  padding: "12px 30px",
};

const content = {
  border: "1px solid rgba(0, 0, 0, 0.1)",
  borderRadius: "3px",
  overflow: "hidden",
};

const image = {
  maxWidth: "100%",
};

const boxInfos = {
  padding: "20px",
};

const containerImageFooter = {
  padding: "45px 0 0 0",
};
