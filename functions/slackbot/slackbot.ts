import axios from "axios";
import { getEnvironmentVariable } from "../../utils/envUtils";

const isJson = (str: string) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

const getBodyFromEvent = ({ body }: any) => {
  if (isJson(body)) {
    return JSON.parse(body);
  }
  return body;
};

const sendSlackMessage = async (webhookUrl: string, message: any) => {
  return await axios.post(webhookUrl, message);
};

const handleOpenPullRequestAction = async (body: any) => {
  const {
    createdName,
    createdImage,
    repoName,
    pullRequestNumber,
    pullRequestUrl,
    pullRequestTitle,
    pullRequestDescription,
  } = getPullRequestInfoFromBody(body);

  return await sendSlackMessage(getEnvironmentVariable("SLACKBOT_PR_URL"), {
    text: `${createdName} opened a PR`,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `${createdName} created a pull request for ${repoName} :fire:\n\n <${pullRequestUrl}|PR #${pullRequestNumber}: ${pullRequestTitle}> ${
            pullRequestDescription
              ? "\n Added initial setup code and file structure stuff"
              : ""
          }`,
        },
        accessory: {
          type: "image",
          image_url: `${createdImage}`,
          alt_text: `GitHub profile picture for ${createdName}`,
        },
      },
    ],
  });
};

const getPullRequestInfoFromBody = ({
  pull_request,
  sender,
  repository,
}: any) => {
  return {
    createdName: sender.login,
    createdImage: sender.avatar_url,
    repoName: repository.name,
    pullRequestNumber: pull_request.number,
    pullRequestUrl: pull_request.html_url,
    pullRequestTitle: pull_request.title,
    pullRequestDescription: pull_request.body,
  };
};

exports.handler = async (event: any, context: any) => {
  try {
    console.log("Submitting");
    const body = getBodyFromEvent(event);

    if (body.action === "opened") {
      console.log("action is 'opened'");
      return await handleOpenPullRequestAction(body);
    }

    return {
      statusCode: 202,
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
