const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/jwt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendMail = require("../ultils/sendMail");
const mongoose = require("mongoose");
// const {email,
//     password,
//     firstname,
//     lastname,
//     mobile} = require('../helpers/joi_schema');
const joi = require("joi");
const makeToken = require("uniqid");

//Register
const register = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password, mobile } = req.body;
  if (!firstname || !lastname || !email || !password || !mobile)
    return res.status(400).json({
      err: 1,
      success: false,
      mes: "Vui lòng nhập đầy đủ thông tin",
    });
  const user = await User.findOne({ email });
  const mobilenumber = await User.findOne({ mobile });
  if (user) throw new Error("Địa chỉ email đã tồn tại");
  if (mobilenumber) throw new Error("Số điện thoại đã tồn tại");
  else {
    const token = makeToken();
    res.cookie(
      "dataRegister",
      { ...req.body, token },
      {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
      }
    );

    const html = `
    <body>
    <div
      id=":p5"
      class="ii gt"
      jslog="20277; u014N:xr6bB; 1:WyIjdGhyZWFkLWY6MTc2MDY4MTI0NTc1MzM0NDA0OCIsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsW11d; 4:WyIjbXNnLWY6MTc2MDY4MTI0ODU5NDAwNjkwNiIsbnVsbCxbXV0."
    >
      <div id=":p4" class="a3s aiL msg2087836104970394291">

        <div
          style="
            padding: 0;
            margin: 0;
            height: 100%;
            width: 100%;
            font-family: Arial, 'Times New Roman', 'Calibri';
          "
        >
          <div
            style="
              margin: 0 auto;
              max-width: 600px;
              display: block;
              font-family: inherit;
            "
          >
            <table
              cellpadding="0"
              cellspacing="0"
              style="
                padding: 0;
                border-spacing: 0;
                background: #f0f0f0;
                border: 0;
                margin: 0;
                text-align: center;
                vertical-align: middle;
                font-weight: 500;
                table-layout: fixed;
                border-collapse: collapse;
                height: 100%;
                width: 100%;
                line-height: 100%;
              "
              width="100%"
              height="100%"
              align="center"
              valign="middle"
            >
              <tbody>
                <tr
                  style="
                    margin: 0;
                    padding: 0;
                    border: none;
                    border-spacing: 0;
                    border-collapse: collapse;
                    font-family: inherit;
                  "
                >
                  <td
                    style="
                      margin: 0;
                      padding: 0;
                      border: none;
                      border-spacing: 0;
                      background: #f0f0f0;
                      border-collapse: collapse;
                      font-family: inherit;
                    "
                  >
                    <table
                      cellpadding="0"
                      cellspacing="0"
                      style="
                        margin: 0;
                        border-spacing: 0;
                        border: 0;
                        padding: 0;
                        width: 100%;
                        border-collapse: collapse;
                      "
                      width="100%"
                    >
                      <tbody>
                        <tr
                          style="
                            margin: 0;
                            padding: 0;
                            border: none;
                            border-spacing: 0;
                            border-collapse: collapse;
                            font-family: inherit;
                          "
                        >
                          <td
                            style="
                              margin: 0;
                              padding: 0;
                              border: none;
                              border-spacing: 0;
                              border-collapse: collapse;
                              font-family: inherit;
                            "
                          >
                            <table
                              cellpadding="0"
                              cellspacing="0"
                              style="
                                margin: 0;
                                padding: 0;
                                border: none;
                                border-spacing: 0;
                                width: 100%;
                                border-collapse: collapse;
                              "
                              width="100%"
                            >
                              <tbody>
                                <tr
                                  style="
                                    margin: 0;
                                    padding: 0;
                                    border: none;
                                    border-spacing: 0;
                                    border-collapse: collapse;
                                    font-family: inherit;
                                  "
                                >
                                  <td
                                    class="m_2087836104970394291dnXDPa"
                                    style="
                                      margin: 0;
                                      padding: 0;
                                      border: none;
                                      border-spacing: 0;
                                      background-image: url(https://ci4.googleusercontent.com/proxy/3LqbCrMw8UgntVe6WpSvZacqVptO-AvgUzj4izigtLKHwsMaAWg9d5O30i-Jj3u6HgdSbkLOcBlX4VT6HHdOnEluWFyVy-God7a4NvEXCHECdaRxsLpvoT7aogHSyDqmwLJgXDxeHQX7xcryOKkdVLyZiANu8X1KnIMFgUSGij5eTSACRiU=s0-d-e1-ft#http://cdn.mcauto-images-production.sendgrid.net/6c20475da3226ec8/484f76b1-56c9-4c73-b20c-8ec7eb01c2be/1836x516.png);
                                      background-size: cover;
                                      width: 612px;
                                      height: 146px;
                                      text-align: center;
                                      border-collapse: collapse;
                                      font-family: inherit;
                                    "
                                    width="612"
                                    height="146"
                                    background="https://ci4.googleusercontent.com/proxy/3LqbCrMw8UgntVe6WpSvZacqVptO-AvgUzj4izigtLKHwsMaAWg9d5O30i-Jj3u6HgdSbkLOcBlX4VT6HHdOnEluWFyVy-God7a4NvEXCHECdaRxsLpvoT7aogHSyDqmwLJgXDxeHQX7xcryOKkdVLyZiANu8X1KnIMFgUSGij5eTSACRiU=s0-d-e1-ft#http://cdn.mcauto-images-production.sendgrid.net/6c20475da3226ec8/484f76b1-56c9-4c73-b20c-8ec7eb01c2be/1836x516.png"
                                    align="center"
                                  ></td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr
                          style="
                            margin: 0;
                            padding: 0;
                            border: none;
                            border-spacing: 0;
                            border-collapse: collapse;
                            font-family: inherit;
                          "
                        >
                          <td
                            colspan="1"
                            style="
                              margin: 0;
                              padding: 0;
                              border: none;
                              border-spacing: 0;
                              height: 24px;
                              border-collapse: collapse;
                              font-family: inherit;
                            "
                            height="24"
                          >
                            <table
                              style="
                                margin: 0;
                                padding: 0;
                                border: none;
                                border-spacing: 0;
                                width: 100%;
                                border-collapse: collapse;
                              "
                              width="100%"
                            ></table>
                          </td>
                        </tr>
                        <tr
                          style="
                            margin: 0;
                            padding: 0;
                            border: none;
                            border-spacing: 0;
                            border-collapse: collapse;
                            font-family: inherit;
                          "
                        >
                          <td
                            style="
                              margin: 0;
                              padding: 0;
                              border: none;
                              border-spacing: 0;
                              text-align: center;
                              border-collapse: collapse;
                              font-family: inherit;
                            "
                            align="center"
                          >
                            <table
                              cellpadding="0"
                              cellspacing="0"
                              style="
                                margin: 0;
                                padding: 0;
                                border: none;
                                border-spacing: 0;
                                width: 100%;
                                border-collapse: collapse;
                              "
                              width="100%"
                            >
                              <tbody>
                                <tr
                                  style="
                                    margin: 0;
                                    padding: 0;
                                    border: none;
                                    border-spacing: 0;
                                    border-collapse: collapse;
                                    font-family: inherit;
                                  "
                                >
                                  <td
                                    class="m_2087836104970394291hTfFsy"
                                    style="
                                      margin: 0;
                                      padding: 0;
                                      border: none;
                                      border-spacing: 0;
                                      height: 100%;
                                      overflow: hidden;
                                      width: 72px;
                                      border-collapse: collapse;
                                      font-family: inherit;
                                    "
                                    width="72"
                                    height="100%"
                                  >
                                    <div
                                      class="m_2087836104970394291hTfFsy"
                                      style="
                                        height: 100%;
                                        overflow: hidden;
                                        width: 72px;
                                        font-family: inherit;
                                      "
                                    ></div>
                                  </td>
                                  <td
                                    style="
                                      margin: 0;
                                      padding: 0;
                                      border: none;
                                      border-spacing: 0;
                                      text-align: center;
                                      border-collapse: collapse;
                                      font-family: inherit;
                                    "
                                    align="center"
                                  >
                                    <h1
                                      style="
                                        font-size: 32px;
                                        font-weight: 500;
                                        letter-spacing: 0.01em;
                                        color: #141212;
                                        text-align: center;
                                        line-height: 39px;
                                        margin: 0;
                                        font-family: inherit;
                                      "
                                    >
                                      XÁC MINH EMAIL
                                    </h1>
                                  </td>
                                  <td
                                    class="m_2087836104970394291hTfFsy"
                                    style="
                                      margin: 0;
                                      padding: 0;
                                      border: none;
                                      border-spacing: 0;
                                      height: 100%;
                                      overflow: hidden;
                                      width: 72px;
                                      border-collapse: collapse;
                                      font-family: inherit;
                                    "
                                    width="72"
                                    height="100%"
                                  >
                                    <div
                                      class="m_2087836104970394291hTfFsy"
                                      style="
                                        height: 100%;
                                        overflow: hidden;
                                        width: 72px;
                                        font-family: inherit;
                                      "
                                    ></div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr
                          style="
                            margin: 0;
                            padding: 0;
                            border: none;
                            border-spacing: 0;
                            border-collapse: collapse;
                            font-family: inherit;
                          "
                        >
                          <td
                            style="
                              margin: 0;
                              padding: 0;
                              border: none;
                              border-spacing: 0;
                              text-align: center;
                              border-collapse: collapse;
                              font-family: inherit;
                            "
                            align="center"
                          >
                            <table
                              cellpadding="0"
                              cellspacing="0"
                              style="
                                margin: 0;
                                padding: 0;
                                border: none;
                                border-spacing: 0;
                                width: 100%;
                                border-collapse: collapse;
                              "
                              width="100%"
                            >
                              <tbody>
                                <tr
                                  style="
                                    margin: 0;
                                    padding: 0;
                                    border: none;
                                    border-spacing: 0;
                                    border-collapse: collapse;
                                    font-family: inherit;
                                  "
                                >
                                  <td
                                    colspan="3"
                                    style="
                                      margin: 0;
                                      padding: 0;
                                      border: none;
                                      border-spacing: 0;
                                      height: 64px;
                                      border-collapse: collapse;
                                      font-family: inherit;
                                    "
                                    height="64"
                                  >
                                    <table
                                      style="
                                        margin: 0;
                                        padding: 0;
                                        border: none;
                                        border-spacing: 0;
                                        width: 100%;
                                        border-collapse: collapse;
                                      "
                                      width="100%"
                                    ></table>
                                  </td>
                                </tr>
                                <tr
                                  style="
                                    margin: 0;
                                    padding: 0;
                                    border: none;
                                    border-spacing: 0;
                                    border-collapse: collapse;
                                    font-family: inherit;
                                  "
                                >
                                  <td
                                    class="m_2087836104970394291hTfFsy"
                                    style="
                                      margin: 0;
                                      padding: 0;
                                      border: none;
                                      border-spacing: 0;
                                      height: 100%;
                                      overflow: hidden;
                                      width: 72px;
                                      border-collapse: collapse;
                                      font-family: inherit;
                                    "
                                    width="72"
                                    height="100%"
                                  >
                                    <div
                                      class="m_2087836104970394291hTfFsy"
                                      style="
                                        height: 100%;
                                        overflow: hidden;
                                        width: 72px;
                                        font-family: inherit;
                                      "
                                    ></div>
                                  </td>
                                  <td
                                    style="
                                      margin: 0;
                                      padding: 0;
                                      border: none;
                                      border-spacing: 0;
                                      text-align: center;
                                      border-collapse: collapse;
                                      font-family: inherit;
                                    "
                                    align="center"
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      style="
                                        margin: 0;
                                        padding: 0;
                                        border: none;
                                        border-spacing: 0;
                                        width: 100%;
                                        background-color: #f9f9f9;
                                        border-collapse: collapse;
                                      "
                                      width="100%"
                                      bgcolor="#F9F9F9"
                                    >
                                      <tbody>
                                        <tr
                                          style="
                                            margin: 0;
                                            padding: 0;
                                            border: none;
                                            border-spacing: 0;
                                            border-collapse: collapse;
                                            font-family: inherit;
                                          "
                                        >
                                          <td
                                            colspan="3"
                                            style="
                                              margin: 0;
                                              padding: 0;
                                              border: none;
                                              border-spacing: 0;
                                              height: 40px;
                                              border-collapse: collapse;
                                              font-family: inherit;
                                            "
                                            height="40"
                                          >
                                            <table
                                              style="
                                                margin: 0;
                                                padding: 0;
                                                border: none;
                                                border-spacing: 0;
                                                width: 100%;
                                                border-collapse: collapse;
                                              "
                                              width="100%"
                                            ></table>
                                          </td>
                                        </tr>
                                        <tr
                                          style="
                                            margin: 0;
                                            padding: 0;
                                            border: none;
                                            border-spacing: 0;
                                            border-collapse: collapse;
                                            font-family: inherit;
                                          "
                                        >
                                          <td
                                            class="m_2087836104970394291gkvQUv"
                                            style="
                                              margin: 0;
                                              padding: 0;
                                              border: none;
                                              border-spacing: 0;
                                              height: 100%;
                                              overflow: hidden;
                                              width: 38px;
                                              border-collapse: collapse;
                                              font-family: inherit;
                                            "
                                            width="38"
                                            height="100%"
                                          >
                                            <div
                                              class="m_2087836104970394291gkvQUv"
                                              style="
                                                height: 100%;
                                                overflow: hidden;
                                                width: 38px;
                                                font-family: inherit;
                                              "
                                            ></div>
                                          </td>
                                          <td
                                            style="
                                              margin: 0;
                                              padding: 0;
                                              border: none;
                                              border-spacing: 0;
                                              text-align: center;
                                              border-collapse: collapse;
                                              font-family: inherit;
                                            "
                                            align="center"
                                          >
                                            <table
                                              style="
                                                margin: 0;
                                                padding: 0;
                                                border: none;
                                                border-spacing: 0;
                                                width: 100%;
                                                table-layout: fixed;
                                                border-collapse: collapse;
                                              "
                                              width="100%"
                                            >
                                              <tbody>
                                                <tr
                                                  style="
                                                    margin: 0;
                                                    padding: 0;
                                                    border: none;
                                                    border-spacing: 0;
                                                    border-collapse: collapse;
                                                    font-family: inherit;
                                                  "
                                                >
                                                  <td
                                                    colspan="1"
                                                    style="
                                                      margin: 0;
                                                      padding: 0;
                                                      border: none;
                                                      border-spacing: 0;
                                                      height: 40px;
                                                      border-collapse: collapse;
                                                      font-family: inherit;
                                                    "
                                                    height="40"
                                                  >
                                                    <table
                                                      style="
                                                        margin: 0;
                                                        padding: 0;
                                                        border: none;
                                                        border-spacing: 0;
                                                        width: 100%;
                                                        border-collapse: collapse;
                                                      "
                                                      width="100%"
                                                    ></table>
                                                  </td>
                                                </tr>
                                                <tr
                                                  style="
                                                    margin: 0;
                                                    padding: 0;
                                                    border: none;
                                                    border-spacing: 0;
                                                    border-collapse: collapse;
                                                    font-family: inherit;
                                                  "
                                                >
                                                  <td
                                                    style="
                                                      margin: 0;
                                                      padding: 0;
                                                      border: none;
                                                      border-spacing: 0;
                                                      text-align: center;
                                                      border-collapse: collapse;
                                                      font-family: inherit;
                                                    "
                                                    align="center"
                                                  >
                                                    <div
                                                      style="
                                                        font-family: inherit;
                                                      "
                                                    >
                                                      <a

                                                        href="https://audiobay.net/api/user/finalregister/${token}"
                                                        class="m_2087836104970394291letYoj"
                                                        style="
                                                          min-width: 300px;
                                                          background: #d13639;
                                                          border-radius: 12.8px;
                                                          padding: 25.5px 19px
                                                            26.5px 19px;
                                                          text-align: center;
                                                          font-size: 18px;
                                                          font-weight: 700;
                                                          color: #f9f9f9;
                                                          display: inline-block;
                                                          text-decoration: none;
                                                          line-height: 120%;
                                                        "
                                                        target="_blank"
                                                        data-saferedirecturl="https://audiobay.net/api/user/finalregister/${token}"
                                                        >XÁC MINH EMAIL</a
                                                      >
                                                    </div>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td>
                                                    <p
                                                      style="
                                                        margin: 0;
                                                        padding: 0;
                                                        font-weight: 500;
                                                        font-size: 18px;
                                                        line-height: 140%;
                                                        letter-spacing: -0.01em;
                                                        color: #666;
                                                        margin-top: 8px;
                                                        font-family: inherit;
                                                      "
                                                    >
                                                      Xin chào ${firstname} ${lastname},
                                                      <br /><br />Vui lòng lựa
                                                      chọn nút bên dưới để xác
                                                      minh địa chỉ email Tài
                                                      Khoản AudioBay của bạn. Việc
                                                      xác minh địa chỉ email sẽ
                                                      đảm bảo thêm một lớp bảo
                                                      mật cho tài khoản của bạn.
                                                      Cung cấp thông tin chính
                                                      xác sẽ giúp bạn nhận được
                                                      hỗ trợ về tài khoản dễ
                                                      dàng hơn khi cần.
                                                    </p>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                          <td
                                            class="m_2087836104970394291gkvQUv"
                                            style="
                                              margin: 0;
                                              padding: 0;
                                              border: none;
                                              border-spacing: 0;
                                              height: 100%;
                                              overflow: hidden;
                                              width: 38px;
                                              border-collapse: collapse;
                                              font-family: inherit;
                                            "
                                            width="38"
                                            height="100%"
                                          >
                                            <div
                                              class="m_2087836104970394291gkvQUv"
                                              style="
                                                height: 100%;
                                                overflow: hidden;
                                                width: 38px;
                                                font-family: inherit;
                                              "
                                            ></div>
                                          </td>
                                        </tr>
                                        <tr
                                          style="
                                            margin: 0;
                                            padding: 0;
                                            border: none;
                                            border-spacing: 0;
                                            border-collapse: collapse;
                                            font-family: inherit;
                                          "
                                        >
                                          <td
                                            colspan="3"
                                            style="
                                              margin: 0;
                                              padding: 0;
                                              border: none;
                                              border-spacing: 0;
                                              height: 48px;
                                              border-collapse: collapse;
                                              font-family: inherit;
                                            "
                                            height="48"
                                          >
                                            <table
                                              style="
                                                margin: 0;
                                                padding: 0;
                                                border: none;
                                                border-spacing: 0;
                                                width: 100%;
                                                border-collapse: collapse;
                                              "
                                              width="100%"
                                            ></table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                  <td
                                    class="m_2087836104970394291hTfFsy"
                                    style="
                                      margin: 0;
                                      padding: 0;
                                      border: none;
                                      border-spacing: 0;
                                      height: 100%;
                                      overflow: hidden;
                                      width: 72px;
                                      border-collapse: collapse;
                                      font-family: inherit;
                                    "
                                    width="72"
                                    height="100%"
                                  >
                                    <div
                                      class="m_2087836104970394291hTfFsy"
                                      style="
                                        height: 100%;
                                        overflow: hidden;
                                        width: 72px;
                                        font-family: inherit;
                                      "
                                    ></div>
                                  </td>
                                </tr>
                                <tr
                                  style="
                                    margin: 0;
                                    padding: 0;
                                    border: none;
                                    border-spacing: 0;
                                    border-collapse: collapse;
                                    font-family: inherit;
                                  "
                                >
                                  <td
                                    colspan="3"
                                    style="
                                      margin: 0;
                                      padding: 0;
                                      border: none;
                                      border-spacing: 0;
                                      height: 48px;
                                      border-collapse: collapse;
                                      font-family: inherit;
                                    "
                                    height="48"
                                  >
                                    <table
                                      style="
                                        margin: 0;
                                        padding: 0;
                                        border: none;
                                        border-spacing: 0;
                                        width: 100%;
                                        border-collapse: collapse;
                                      "
                                      width="100%"
                                    ></table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr
                          style="
                            margin: 0;
                            padding: 0;
                            border: none;
                            border-spacing: 0;
                            border-collapse: collapse;
                            font-family: inherit;
                          "
                        >
                          <td
                            style="
                              margin: 0;
                              padding: 0;
                              border: none;
                              border-spacing: 0;
                              text-align: center;
                              border-collapse: collapse;
                              font-family: inherit;
                            "
                            align="center"
                          >
                            <table
                              cellpadding="0"
                              cellspacing="0"
                              style="
                                margin: 0;
                                padding: 0;
                                border: none;
                                border-spacing: 0;
                                width: 100%;
                                font-size: 16px;
                                text-align: center;
                                line-height: 140%;
                                letter-spacing: -0.01em;
                                color: #666;
                                border-collapse: collapse;
                              "
                              width="100%"
                              align="center"
                            >
                              <tbody>
                                <tr
                                  style="
                                    margin: 0;
                                    padding: 0;
                                    border: none;
                                    border-spacing: 0;
                                    border-collapse: collapse;
                                    font-family: inherit;
                                  "
                                >
                                  <td
                                    class="m_2087836104970394291kETegz"
                                    style="
                                      margin: 0;
                                      padding: 0;
                                      border: none;
                                      border-spacing: 0;
                                      height: 100%;
                                      overflow: hidden;
                                      width: 100px;
                                      border-collapse: collapse;
                                      font-family: inherit;
                                    "
                                    width="100"
                                    height="100%"
                                  >
                                    <div
                                      class="m_2087836104970394291kETegz"
                                      style="
                                        height: 100%;
                                        overflow: hidden;
                                        width: 100px;
                                        font-family: inherit;
                                      "
                                    ></div>
                                  </td>
                                 
                                  <td
                                    class="m_2087836104970394291kETegz"
                                    style="
                                      margin: 0;
                                      padding: 0;
                                      border: none;
                                      border-spacing: 0;
                                      height: 100%;
                                      overflow: hidden;
                                      width: 100px;
                                      border-collapse: collapse;
                                      font-family: inherit;
                                    "
                                    width="100"
                                    height="100%"
                                  >
                                    <div
                                      class="m_2087836104970394291kETegz"
                                      style="
                                        height: 100%;
                                        overflow: hidden;
                                        width: 100px;
                                        font-family: inherit;
                                      "
                                    ></div>
                                  </td>
                                </tr>
                                <tr
                                  style="
                                    margin: 0;
                                    padding: 0;
                                    border: none;
                                    border-spacing: 0;
                                    border-collapse: collapse;
                                    font-family: inherit;
                                  "
                                >
                                  <td
                                    colspan="3"
                                    style="
                                      margin: 0;
                                      padding: 0;
                                      border: none;
                                      border-spacing: 0;
                                      height: 80px;
                                      border-collapse: collapse;
                                      font-family: inherit;
                                    "
                                    height="80"
                                  >
                                    <table
                                      style="
                                        margin: 0;
                                        padding: 0;
                                        border: none;
                                        border-spacing: 0;
                                        width: 100%;
                                        border-collapse: collapse;
                                      "
                                      width="100%"
                                    ></table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
       
      </div>
    </div>
  </body>`;
    sendMail({
      email: email,
      html,
      subject: "🚀 Xác thực tài khoản đăng ký AudioBay",
    });
    return res.json({
      success: true,
      mes: "Vui lòng kiểm tra email để xác thực tài khoản",
    });
  }
});
const finalRegister = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  const { token } = req.params;
  if (!cookie || cookie?.dataRegister?.token !== token) {
    res.clearCookie("dataRegister");
    // return res.redirect(`${process.env.URL_CLIENT}/finalregister/failed`);
    return res.redirect(`https://audiobay.net/finalregister/failed`);
  }
  const newUser = await User.create({
    email: cookie.dataRegister.email,
    password: cookie?.dataRegister?.password,
    firstname: cookie?.dataRegister?.firstname,
    lastname: cookie?.dataRegister?.lastname,
    mobile: cookie?.dataRegister?.mobile,
  });
  res.clearCookie("dataRegister");
  if (newUser) {
    // product environment
    res.clearCookie("dataRegister");
    return res.redirect(`https://audiobay.net/finalregister/success`);

    // return res.redirect(`${process.env.URL_CLIENT}/finalregister/success`);
  } else {
    // product environment
    return res.redirect(`https://audiobay.net/finalregister/failed`);

    // return res.redirect(`${process.env.URL_CLIENT}/finalregister/failed`);
  }
});

// Refresh token => Cấp mới access token
// Access token => Xác thực người dùng, phân quyền người dùng
// Login
const login = asyncHandler(async (req, res) => {
  const { email, password, mobile } = req.body;
  if ((!email && !mobile) || !password)
    return res.status(400).json({
      success: false,
      mes: "Missing input ",
    });
  // if (!email || !password) {
  //     return res.status(400).json({
  //         success: false,
  //         mes: 'Missing input '
  //     });
  // }
  //Check email exist
  const response = await User.findOne({ email });
  const responsemobile = await User.findOne({ mobile });
  if (!response && !responsemobile) throw new Error("Email không đúng");
  // if (responsemobile.isCorrectPassword(password)) throw new Error('Mật khẩu không đúng');
  //plain object
  // console.log(await response.isCorrectPassword(password));
  if (response && (await response.isCorrectPassword(password))) {
    const { password, role, refreshToken, ...data } = response.toObject();
    const accessToken = generateAccessToken(response._id, role);
    const newRefreshToken = generateRefreshToken(response._id);
    // console.log(newRefreshToken);
    // console.log(newRefreshToken);
    //
    await User.findByIdAndUpdate(
      response._id,
      { refreshToken: newRefreshToken },
      { new: true }
    );
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      mes: "Login successfully",
      accessToken,
      data,
      role,
    });
  }
  //else if (responsemobile && await responsemobile.isCorrectPassword(password)) {
  //     // Tách password và role ra khỏi response
  //     const { password, role, refreshToken, ...data } = responsemobile.toObject()
  //     // Tạo accessToken và refreshToken
  //     const accessToken = generateAccessToken(responsemobile._id, role);
  //     const newRefreshToken = generateRefreshToken(responsemobile._id);
  //     // Lưu refreshToken vào db
  //     await User.findByIdAndUpdate(responsemobile._id, { refreshToken: newRefreshToken }, { new: true });
  //     // Lưu refreshToken vào cookie
  //     res.cookie('refreshToken', newRefreshToken, {
  //         httpOnly: true,
  //         maxAge: 7 * 24 * 60 * 60 * 1000,
  //     })
  //     return res.status(200).json({
  //         success: true,
  //         mes: 'Login successfully',
  //         accessToken,
  //         data,
  //         role,
  //     });
  // }
  else {
    throw new Error("Mật khẩu không đúng");
  }
});
//Get current user
const getCurrent = asyncHandler(async (req, res) => {
  const { uid } = req.user;
  // console.log(uid);
  //Check email exist
  const user = await User.findById(uid).select("-password -refreshToken");
  // console.log(user);
  return res.status(200).json({
    success: user ? true : false,
    rs: user ? user : "User not found",
  });
});
const refreshAccessToken = asyncHandler(async (req, res) => {
  // Lấy refreshToken từ cookie
  const cookie = req.cookies;
  // console.log(cookie);
  //Check xem có refreshToken không
  if (!cookie && !cookie.refreshToken)
    throw new Error("Missing refresh token in cookie");
  // Kiểm tra refreshToken có hợp lệ không còn hạn sử dụng không
  const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);
  const response = await User.findOne({
    _id: rs.uid,
    refreshToken: cookie.refreshToken,
  });
  return res.status(200).json({
    success: response ? true : false,
    newAccessToken: response
      ? generateAccessToken(response._id, response.role)
      : "Refresh token not matched",
  });
});
// Logout
const logout = asyncHandler(async (req, res) => {
  // Lấy refreshToken từ cookie
  const cookie = req.cookies;
  //Check xem có refreshToken không
  if (!cookie || !cookie.refreshToken)
    throw new Error("No refresh token in cookie");
  // Xóa refreshToken khỏi db
  await User.findOneAndUpdate(
    { refreshToken: cookie.refreshToken },
    { refreshToken: "" },
    { new: true }
  );
  // Xóa refreshToken khỏi cookie ở trình duyệt
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  return res.status(200).json({
    success: true,
    mes: "Logout successfully",
  });
});
/* 1.Client gửi email 
2.Server kiểm tra email có tồn tại không => gửi mail + kèm theo link(password change token) 
3.Client check mail click vào link => chuyển hướng đến trang đổi mật khẩu
4.Client gửi api kèm theo token
5.Server kiểm tra token có hợp lệ không => đổi mật khẩu
*/
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) throw new Error("Missing email");
  const user = await User.findOne({ email });
  if (!user) throw new Error("Chưa có tài khoản với email này");
  const resetToken = user.createPasswordChangedToken();
  await user.save();

  // Gửi mail
  // const html = `<h1>Reset password</h1>
  // <p>Click <a href="${process.env.URL_SERVER}/api/user/reset-password/${resetToken}">here</a> to reset password</p>
  // `;
  //   const html = `<table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
  //     style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
  //     <tr>
  //         <td>
  //             <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
  //                 align="center" cellpadding="0" cellspacing="0">
  //                 <tr>
  //                     <td style="height:80px;">&nbsp;</td>
  //                 </tr>
  //                 <tr>
  //                     <td style="text-align:center;">
  //                       <a href="https://rakeshmandal.com" title="logo" target="_blank">
  //                         <img width="60" src="https://templates.iqonic.design/muzik/html-dark/images/logo.png" title="logo" alt="logo">
  //                       </a>
  //                       <h2 style="color:#59595c; font-weight:700; margin-top:10;font-size:32px;font-family:'Rubik',sans-serif;">AudioBay.com</h2>
  //                     </td>
  //                 </tr>
  //                 <tr>
  //                     <td style="height:20px;">&nbsp;</td>
  //                 </tr>
  //                 <tr>
  //                     <td>
  //                         <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
  //                             style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
  //                             <tr>
  //                                 <td style="height:40px;">&nbsp;</td>
  //                             </tr>
  //                             <tr>
  //                                 <td style="padding:0 35px;">
  //                                     <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
  //                                         requested cause forgot password</h1>
  //                                     <span
  //                                         style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
  //                                     <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
  //                                         We cannot simply send you your old password. A unique link to has been generated for you. When you forgot your password, click the
  //                                         following link and follow the instructions.
  //                                     </p>
  //                                     <a  href="${process.env.URL_SERVER}/api/user/reset-password/${resetToken}"
  //                                         style="background:#ff4545;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Click here</a>
  //                                 </td>
  //                             </tr>
  //                             <tr>
  //                                 <td style="height:40px;">&nbsp;</td>
  //                             </tr>
  //                         </table>
  //                     </td>
  //                 <tr>
  //                     <td style="height:20px;">&nbsp;</td>
  //                 </tr>
  //                 <tr>
  //                     <td style="text-align:center;">
  //                         <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>Audiobay.com</strong></p>
  //                     </td>
  //                 </tr>
  //                 <tr>
  //                     <td style="height:80px;">&nbsp;</td>
  //                 </tr>
  //             </table>
  //         </td>
  //     </tr>
  // </table>
  //     `;
  const html = `<body bgcolor="#DFE4E5" text="#808080" style="
  margin: 0px;
  -webkit-text-size-adjust: none;
  background-color: #dfe4e5;
  font-family: Arial, helvetica, sans-serif;
  line-height: 100%;
  font-size: 16px;
  color: #808080;
  padding: 10px 0px;
  ">
  <img src="https://click.mailer.akaipro.com/open.aspx?ffcb10-fecb167370640279-fe501d797367037a7015-fe331571756404787d1079-ff2d15787161-fe541174706c00747017-ff2c16737263&amp;d=110019&amp;bmt=0" width="1" height="1" alt="" />
  <meta name="robots" content="noindex, nofollow" />
  <meta name="referrer" content="no-referrer" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <style type="text/css">
  ReadMsgBody {
    width: 100%;
  }
  
  .ExternalClass {
    width: 100%;
  }
  
  .ExternalClass,
  .ExternalClass p,
  .ExternalClass span,
  .ExternalClass font,
  .ExternalClass td,
  .ExternalClass div {
    line-height: 100%;
  }
  
  body {
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    margin: 0 !important;
  }
  
  p {
    margin: 1em 0;
  }
  
  table td {
    border-collapse: collapse;
  }
  
  img {
    outline: 0;
  }
  
  a img {
    border: none;
  }
  
  @-ms-viewport {
    width: device-width;
  }
  </style>
  <style type="text/css">
  @media only screen and (max-width: 480px) {
    .container {
      width: 100% !important;
    }
  
    .footer {
      width: auto !important;
      margin-left: 0;
    }
  
    .mobile-hidden {
      display: none !important;
    }
  
    .logo {
      display: block !important;
      padding: 0 !important;
    }
  
    img {
      max-width: 100% !important;
      height: auto !important;
      max-height: auto !important;
    }
  
    .header img {
      max-width: 100% !important;
      height: auto !important;
      max-height: auto !important;
    }
  
    .photo img {
      width: 100% !important;
      max-width: 100% !important;
      height: auto !important;
    }
  
    .drop {
      display: block !important;
      width: 100% !important;
      float: left;
      clear: both;
    }
  
    .footerlogo {
      display: block !important;
      width: 100% !important;
      padding-top: 15px;
      float: left;
      clear: both;
    }
  
    .nav4,
    .nav5,
    .nav6 {
      display: none !important;
    }
  
    .tableBlock {
      width: 100% !important;
    }
  
    .responsive-td {
      width: 100% !important;
      display: block !important;
      padding: 0 !important;
    }
  
    .fluid,
    .fluid-centered {
      width: 100% !important;
      max-width: 100% !important;
      height: auto !important;
      margin-left: auto !important;
      margin-right: auto !important;
    }
  
    .fluid-centered {
      margin-left: auto !important;
      margin-right: auto !important;
    }
  
    /* MOBILE GLOBAL STYLES - DO NOT CHANGE */
    body {
      padding: 0px !important;
      font-size: 16px !important;
      line-height: 150% !important;
    }
  
    h1 {
      font-size: 22px !important;
      line-height: normal !important;
    }
  
    h2 {
      font-size: 20px !important;
      line-height: normal !important;
    }
  
    h3 {
      font-size: 18px !important;
      line-height: normal !important;
    }
  
    .buttonstyles {
      font-family: arial, helvetica, sans-serif !important;
      font-size: 16px !important;
      color: #ffffff !important;
      padding: 10px !important;
    }
  
    /* END OF MOBILE GLOBAL STYLES - DO NOT CHANGE */
  }
  
  @media only screen and (max-width: 640px) {
    .container {
      width: 100% !important;
    }
  
    .mobile-hidden {
      display: none !important;
    }
  
    .logo {
      display: block !important;
      padding: 0 !important;
    }
  
    .photo img {
      width: 100% !important;
      height: auto !important;
    }
  
    .nav5,
    .nav6 {
      display: none !important;
    }
  
    .fluid,
    .fluid-centered {
      width: 100% !important;
      max-width: 100% !important;
      height: auto !important;
      margin-left: auto !important;
      margin-right: auto !important;
    }
  
    .fluid-centered {
      margin-left: auto !important;
      margin-right: auto !important;
    }
  }
  
  .txt-color:hover {
    color: #ca0928 !important;
  }
  
  .bg-rollover:hover {
    background-color: #eaeaea !important;
  }
  </style>
  
  <style type="text/css">
  div.preheader {
    display: none !important;
  }
  </style>
  <div class="preheader" style="font-size: 1px; display: none !important"> The most advanced sound mangler for only $39 </div>
  <div style="font-size: 0; line-height: 0">
  <img src="https://click.mailer.akaipro.com/open.aspx?ffcb10-fecb167370640279-fe501d797367037a7015-fe331571756404787d1079-ff2d15787161-fe541174706c00747017-ff2c16737263&amp;d=110019&amp;bmt=0" width="1" height="1" alt="" />
  </div>
  <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
  <tbody>
    <tr>
      <td align="center" valign="top">
        <div style="display: none; max-height: 0px; overflow: hidden"> &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp; &zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp; </div>
        <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
          <tbody>
            <tr>
              <td align="center" valign="top">
          
              </td>
            </tr>
            <tr>
              <td align="center">
                <table cellspacing="0" cellpadding="0" border="0" width="600" class="container" align="center">
                  <tbody>
                    <tr>
                      <td>
                        <table style="
                            font-size: 16px;
                            font-family: Arial, helvetica, sans-serif;
                            color: #808080;
                            background-color: #ffffff;
                            border-image: initial;
                            border-top: 4px solid #cc092a;
                            border-right: 0px;
                            border-bottom: 0px;
                            border-left: 0px;
                            line-height: 100%;
                          " class="tb_properties border_style" cellspacing="0" cellpadding="0" bgcolor="#FFFFFF" width="100%">
                          <tbody>
                            <tr>
                              <td align="center" valign="top">
                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%">
                                  <tbody>
                                    <tr>
                                      <td class="content_padding" style="border: 0px; padding: 0px">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                          <tbody>
                                            <tr>
                                              <td align="left" class="header" valign="top">
                                                <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="
                                                    border: 0px;
                                                    background-color: transparent;
                                                    min-width: 100%;
                                                  " class="slot-styling">
                                                  <tbody>
                                                    <tr>
                                                      <td style="padding: 0px" class="slot-styling camarker-inner">
                                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="
                                                            text-align: center;
                                                            background-color: #000000;
                                                            border: 0px;
                                                            min-width: 100%;
                                                          " class="stylingblock-content-wrapper">
                                                          <tbody>
                                                            <tr>
                                                              <td style="
                                                                  padding: 20px
                                                                    0px;
                                                                " class="stylingblock-content-wrapper camarker-inner" align="center">
                                                                <table width="100%" cellspacing="0" cellpadding="0" role="presentation">
                                                                  <tbody>
                                                                    <tr>
                                                                      <td align="center">
                                                                        <a href="https://click.mailer.akaipro.com/?qs=10a0b30cdd5276f4d17e61f105240a93ee9fea53eed6343961c1ddb888259c1417af02296ee6e9f6271a0db47b5640940059f884ecda86970d482b829ca44ad2" title="AKAI" data-linkto="https://">
                                                                          <img data-assetid="158420" src="https://scontent.fhan17-1.fna.fbcdn.net/v/t1.6435-9/101840761_278637433507245_2600699580870628471_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=e3f864&_nc_ohc=BMaio49AVfcAX9YxrHB&_nc_ht=scontent.fhan17-1.fna&oh=00_AfA02ViDwMfB0W_Rtsia-3kOl14ZYHKS0O_Ji-HlavTaTA&oe=647AC8E4" alt="AKAI PRO" height="83" width="500" style="
                                                                              display: block;
                                                                              height: 83px;
                                                                              width: 500px;
                                                                              text-align: center;
                                                                              padding: 0px;
                                                                              object-fit: contain;
                                                                            " />
                                                                        </a>
                                                                      </td>
                                                                    </tr>
                                                                  </tbody>
                                                                </table>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td align="left" class="" valign="top">
                                                <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="
                                                    border: 0px;
                                                    background-color: transparent;
                                                    min-width: 100%;
                                                  " class="slot-styling">
                                                  <tbody>
                                                    <tr>
                                                      <td style="padding: 0px" class="slot-styling camarker-inner">
                                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="
                                                            background-color: #000000;
                                                            min-width: 100%;
                                                          " class="stylingblock-content-wrapper">
                                                          <tbody>
                                                            <tr>
                                                              <td style="
                                                                  padding: 0px;
                                                                " class="stylingblock-content-wrapper camarker-inner">
                                                                <table cellspacing="0" cellpadding="0" role="presentation" style="
                                                                    width: 100%;
                                                                  ">
                                                                  <tbody>
                                                                    <tr>
                                                                      <td>
                                                                        <table cellspacing="0" cellpadding="0" role="presentation" style="
                                                                            width: 100%;
                                                                          ">
                                                                          <tbody>
                                                                            <tr>
                                                                              <td valign="top" class="responsive-td" style="
                                                                                  width: 100%;
                                                                                ">
                                                                                <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="
                                                                                    text-align: left;
                                                                                    background-color: transparent;
                                                                                    min-width: 100%;
                                                                                  " class="stylingblock-content-wrapper">
                                                                                  <tbody>
                                                                                    <tr>
                                                                                      <td style="
                                                                                          padding: 0px;
                                                                                        " class="stylingblock-content-wrapper camarker-inner" align="left">
                                                                                        <table width="100%" cellspacing="0" cellpadding="0" role="presentation">
                                                                                          <tbody>
                                                                                            <tr>
                                                                                              <td align="center">
                                                                                                <a href="https://www.facebook.com/musicproducer.vn" target="_blank" title="AudiBay" data-linkto="https://">
                                                                                                  <img data-assetid="158419" src="https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-6/297774621_807454477292202_5579223159905593777_n.png?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=V7y1HE1SE8MAX-MyWAI&_nc_ht=scontent.fhan17-1.fna&oh=00_AfDPQv4lW6svqRE6T89vpYsFraBDLg6zpAcRTJz7e1RveQ&oe=6459491A" alt="AKAI x AIR -- Flex Beat" width="600" style="
                                                                                                      display: block;
                                                                                                      height: 400px;
                                                                                                      object-fit: cover;
                                                                                                      width: 100%;
                                                                                                      padding: 0px;
                                                                                                      text-align: center;
                                                                                                    " />
                                                                                                </a>
                                                                                              </td>
                                                                                            </tr>
                                                                                          </tbody>
                                                                                        </table>
                                                                                      </td>
                                                                                    </tr>
                                                                                  </tbody>
                                                                                </table>
                                                                              </td>
                                                                            </tr>
                                                                          </tbody>
                                                                        </table>
                                                                      </td>
                                                                    </tr>
                                                                  </tbody>
                                                                </table>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="
                                                            background-color: #000000;
                                                            min-width: 100%;
                                                          " class="stylingblock-content-wrapper">
                                                          <tbody>
                                                            <tr>
                                                              <td style="
                                                                  padding: 25px
                                                                    15px;
                                                                " class="stylingblock-content-wrapper camarker-inner">
                                                                <link href="https://fonts.gstatic.com" rel="preconnect" />
                                                                <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&amp;display=swap" rel="stylesheet" />
                                                                <div style="
                                                                    line-height: 36px;
                                                                    text-align: center;
                                                                  ">
                                                                  <span style="
                                                                      font-size: 30px;
                                                                    ">
                                                                    <span style="
                                                                        color: #ffffff;
                                                                      ">
                                                                      <span style="
                                                                          font-family: 'Open Sans',
                                                                            Arial,
                                                                            Helvetica,
                                                                            Sans
                                                                              Serif !important;
                                                                        ">
                                                                        <b>You have resquest forgot password. Click the button below to reset your password.</b>
                                                                           </b>
                                                                      </span>
                                                                    </span>
                                                                  </span>
                                                                </div>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="
                                                            background-color: #000000;
                                                            min-width: 100%;
                                                          " class="stylingblock-content-wrapper">
                                                          <tbody>
                                                            <tr>
                                                              <td style="
                                                                  padding: 0px
                                                                    0px 15px;
                                                                " class="stylingblock-content-wrapper camarker-inner">
                                                                <center>
                                                                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                    <tbody>
                                                                      <tr>
                                                                        <td>
                                                                          <center>
                                                                            <table border="0" cellspacing="0" cellpadding="0">
                                                                              <tbody>
                                                                                <tr>
                                                                                  <td bgcolor="#cc092a" class="bg-rollover" style="
                                                                                      padding: 15px
                                                                                        40px
                                                                                        15px
                                                                                        40px;
                                                                                      border-radius: 5px;
                                                                                    " align="center">
                                                                                    <a href="https://audiobay.net/reset-password/${resetToken}" target="_blank" class="txt-color" style="
                                                                                        font-size: 16px;
                                                                                        font-family: 'Open Sans',
                                                                                          Arial,
                                                                                          Helvetica,
                                                                                          Sans
                                                                                            Serif !important;
                                                                                        font-weight: bold;
                                                                                        color: #ffffff;
                                                                                        text-decoration: none;
                                                                                      ">RESET PASSWORD</a>
                                                                                  </td>
                                                                                </tr>
                                                                              </tbody>
                                                                            </table>
                                                                          </center>
                                                                        </td>
                                                                      </tr>
                                                                    </tbody>
                                                                  </table>
                                                                </center>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="
                                                            background-color: #000000;
                                                            min-width: 100%;
                                                          " class="stylingblock-content-wrapper">
                                                          <tbody>
                                                            <tr>
                                                              <td style="
                                                                  padding: 0px
                                                                    25px 25px;
                                                                " class="stylingblock-content-wrapper camarker-inner">
                                                                <link href="https://fonts.gstatic.com" rel="preconnect" />
                                                                <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400&amp;display=swap" rel="stylesheet" />
                                                                <div style="
                                                                    line-height: 36px;
                                                                    text-align: center;
                                                                  ">
                                                                  <span style="
                                                                      color: #ffffff;
                                                                    ">
                                                                   
                                                                  </span>
                                                                </div>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                   
                                                   
                                                
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                            </tr>
                                       
                                         
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
           
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
  </table>
  </body>`;
  const data = {
    email,
    html,
    subject: "🚀 Forgot password ✔",
  };
  const rs = sendMail(data);
  return res.status(200).json({
    success: rs ? true : false,
    mes: rs ? "Email sent successfully" : "Email sent failed",
    rs,
  });
});
const resetPassword = asyncHandler(async (req, res) => {
  const { password, token } = req.body;
  // console.log({ password, token });
  if (!password || !token) throw new Error("Mật khẩu hoặc token không hợp lệ");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Token không hợp lệ hoặc đã hết hạn");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordChangedAt = Date.now();
  user.passwordResetExpires = undefined;
  //lưu user information vào db
  await user.save();
  return res.status(200).json({
    success: user ? true : false,
    mes: user ? "Đổi mật khẩu thành công" : "Đổi mật khẩu thất bại",
  });
});

const getUsers = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  const excludedFields = ["sort", "page", "limit", "fields"];
  excludedFields.forEach((el) => delete queries[el]);

  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (match) => `$${match}`
  );
  const formatedQueries = JSON.parse(queryString);

  if (queries?.name) {
    formatedQueries.name = {
      $regex: queries.name,
      $options: "i",
    };
  }
  if (req.query.q) {
    delete formatedQueries.q;
    formatedQueries["$or"] = [
      { firstname: { $regex: req.query.q, $options: "i" } },
      { lastname: { $regex: req.query.q, $options: "i" } },
      { email: { $regex: req.query.q, $options: "i" } },
    ];
  }
  let queryCommand = User.find(formatedQueries);

  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  } else {
    queryCommand = queryCommand.sort("-createdAt");
  }
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  } else {
    queryCommand = queryCommand.select("-__v");
  }
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || undefined;
  const skip = (page - 1) * limit;
  queryCommand = queryCommand.skip(skip).limit(limit);
  if (req.query.page) {
    const counts = await User.find(formatedQueries).countDocuments();
    if (counts === 0)
      return res
        .status(200)
        .json({ msg: "Không có người dùng nào", success: true, data: [] });
    if (skip >= counts) throw new Error("Trang không tồn tại");
  }
  queryCommand.exec(async (err, response) => {
    if (err) throw new Error(err.message);
    const counts = await User.find(formatedQueries).countDocuments();
    return res.status(200).json({
      success: response ? true : false,
      counts,
      limit,
      skip,
      data: response ? response : "No user found",
      msg: response ? "Get users successfully" : "Get users failed",
    });
  });
  // const response = await User.find().select("-password -refreshToken -role ");
  // return res.status(200).json({
  //   success: response ? true : false,
  //   data: response ? response : "No user found",
  // });
});
const deleteUser = asyncHandler(async (req, res) => {
  //get id from request query params
  const { uid } = req.params;
  if (!uid) throw new Error("Missing id");
  if (!mongoose.Types.ObjectId.isValid(uid)) throw new Error("id is invalid");
  const response = await User.findByIdAndDelete(uid);
  return res.status(200).json({
    success: response ? true : false,
    mes: response
      ? `User with email ${response.email} deleted successfully`
      : `User not found`,
  });
});
const updateUser = asyncHandler(async (req, res) => {
  // req.user là user được lưu trong token tự update tài khoản của nó
  const { uid } = req.user;
  if (!uid || Object.keys(req.body).length === 0)
    throw new Error("Missing inputs");
  const response = await User.findByIdAndUpdate(uid, req.body, {
    new: true,
  }).select("-password -role");
  return res.status(200).json({
    mes: response ? "User updated successfully" : "User updated failed",
    success: response ? true : false,
    data: response ? response : `Something went wrong`,
  });
});
const uploadAvatar = asyncHandler(async (req, res) => {
  if (!req.file) throw new Error("Missing file");
  const { uid } = req.user;
  const response = await User.findByIdAndUpdate(
    uid,
    { avatar: req.file },
    { new: true }
  ).select("-password -role");
  return res.status(200).json({
    mes: response ? "Avatar updated successfully" : "Avatar updated failed",
    success: response ? true : false,
    data: response ? response : `Something went wrong`,
  });
});

const updateUserByAdmin = asyncHandler(async (req, res) => {
  const { uid } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  const response = await User.findByIdAndUpdate(uid, req.body, {
    new: true,
  }).select("-password -role -refreshToken");
  // response.updatedAt = Date.now();
  return res.status(200).json({
    mes: response ? "User updated successfully" : "User updated failed",
    success: response ? true : false,
  });
});
module.exports = {
  register,
  login,
  getCurrent,
  refreshAccessToken,
  logout,
  forgotPassword,
  resetPassword,
  getUsers,
  deleteUser,
  updateUser,
  updateUserByAdmin,
  uploadAvatar,
  finalRegister,
};
