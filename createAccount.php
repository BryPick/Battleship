<?php
    require_once(__DIR__.'/layouts/top_layout.php');
?>
    <div class="container">
        <div class="row vertical-center">
            <div class="user-forms">
                <h1 class="sub-title">Create Account</h1>
                <div class="alert" id="user-msg" role="alert">
                </div>
                <div class="forms">
                    <div class="form-group">
                        <input type="text" class="form-control" id="create-username" placeholder="Create Username" required/>
                    </div>
                    <div class="form-group">
                        <div class="pw-toggle-group">
                            <input type="password" class="form-control" id="create-password" placeholder="Create Password" required/>
                            <a id="regPwToggleLink" onclick=""><i class="fa fa-eye"></i> Show</a>
                        </div>
                        <div id="pwd-char-req">
                            <p class="pwd-chars-msg" id="eight-chars-msg"><strong>Password at least 8 characters long</strong><span class="done-word" id="done-eight"><strong>: DONE!</strong></span><br></p>
                            <p class="pwd-chars-msg" id="spec-chars-msg"><strong>Password contains one special character: !@#$%&</strong><span class="done-word" id="done-spec"><strong>: DONE!</strong></span></p>
                        </div>
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" id="conf-password" placeholder="Confirm Password" required/>
                    </div>
                    <div class="form-group create-acct-btns">
                        <input type="button" class="btn btn-danger" id="back-home-btn" onclick="location.href='index.php';" value="Back to Home"/>
                        <input type="submit" class="btn btn-success" id="create-acct-btn" value="Create Account"/>
                    </div>
                </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90.82 23.3" width="450" id="battleship-load">
                <defs>
                    <linearGradient id="logo-gradient" x1="50%" y1="0%" x2="50%" y2="100%" >

                        <stop offset="0%" stop-color="#785B21">
                            <animate attributeName="stop-color" values="#785B21; #E0A93D;" dur="2s" repeatCount="indefinite"></animate>
                        </stop>

                        <stop offset="100%" stop-color="#785B21">
                            <animate attributeName="stop-color" values="#785B21; #E0A93D;" dur="2s" repeatCount="indefinite"></animate>
                        </stop>

                    </linearGradient>

                </defs>
                <title>battleshipLoad</title>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_1-2" data-name="Layer 1">
                        <path class="cls-1" fill="url('#logo-gradient')" d="M6.12,23.3h83.3l1.4-3h0V15.9h-.2v4.4H77.22l-.6-1.4H75v-.4h1.3v-.2H75a1.18,1.18,0,0,0-1-.5c-.8,0-.8.1-.8.3v.8h-1s0-.7-.3-.8a2.25,2.25,0,0,0-.7-.1v-.5h1.1v-.2H71a3.14,3.14,0,0,0-1.2-.4c-.5,0-.8,0-.8.3V18h-.7l-.1-.3V17l.4-.6V16h-.7v-.4h-1.4v-.3a3.1,3.1,0,0,1,.7-.2h.2V15H67a1,1,0,0,0-.6-.3.55.55,0,0,0-.5.4c0,.1.3.2.3.2v.3h-.3v.5h-1l-.3-.3v-.4l.6-.5v-.3h-.9v-.8h-.5v-.4s.4-.3.4-.5-.3-.4-.7-.4-.7.8-.7.8l.2.3v.3l-.2.1v.7h-.6V15h-.7l-.3-1.3.6-.3-.7-.1-.3-.5v-.5l1.5-.2v-.4h-.1l-.1.2-1.4.1-.2-1.7h-.1l-.1,1.7-1.7.1-.2-2.4.5-.1.4-.3V9.2h-.7L58.42,3h-.1l-.1,6.2H57v.2h.6l.4.4V12h-.2v.3H58l.8,2.9h0l-.5-2.5-.1-.6.7.1.8.3-.2.9h-.7v.2h.6L59,15h-.8v1l-.7.2-1-.5-.2.1.2.2.8.4V17H57s-.1-.3-.3-.3-.2.3-.2.3h-.7v-.9h-.2v.5l-.2.4h-.5s-.1-.5-.4-.4-.3.4-.3.4h-.7L53,13l.4-.2v-.3h-.5v-1s.8-.7.8-1.1-1.5-1.7-1.5-1.7V8.3h-.5v.4h-1.3l-.2-2.2s0-.1.2,0,.3.6.5.6.9-.1.9-.2a1,1,0,0,0-.2-.5,6.51,6.51,0,0,0-1.5-.9l.1-4.1a.83.83,0,0,1,.8-.1,3.26,3.26,0,0,0,1,.3,4.33,4.33,0,0,0,.5-.1L52.32.2a.58.58,0,0,1-.4.1c-.3,0-1-.3-1.2-.3a1.23,1.23,0,0,0-.5.2.1.1,0,0,0-.1-.1c-.1,0-.1.2-.1.2V5.1l-.4-.1a3.11,3.11,0,0,0-.6-.4c-.1,0-.1.3-.1.3s-1.1,2.7-.9,2.8a2.39,2.39,0,0,0,.9.3c.2,0,.9-1.3.9-1.3l-.2,1.9h-1.3l-.5-.3-.4.1-.3.3a13.64,13.64,0,0,1,2,1.1,2.93,2.93,0,0,1-.4.8l-.7.2-.3.1-.1-.7-.5-.1s.1-.5-.2-.5a.36.36,0,0,0-.3.5,1.24,1.24,0,0,1,.3.2l.5.1V11h-.2v.4h1.1l.3.3-.3,3.4h-.1l-.1-1.4a2.07,2.07,0,0,0-1.4-.5h-1.1V14h-.8l-.1-.5-.3-.2v-.2s.4-.1.4-.4a.66.66,0,0,0-.4-.5,1.44,1.44,0,0,0-.3-.2L44,7.4h-.1V12s-.6.2-.6.6.4.6.4.6v.2h-.5v.9H40v1.6h-.3l-.1-.2h-.5v.5l.6.5v.7h-.2V18h-.3v-.6h-.4V16.3h-2.3l-.4-.7h-.8s-.2,0-.2.1l-.1.1h-1.7v.1h1.3v.2l.1.1v.2a1,1,0,0,1-.3.1c-.1.1-.5.4-.5.4H33V17h.5v.2h.4a1,1,0,0,0,.3.1c.1,0,.1.2.1.2v.6h-.2v.7h-2.6V18a1.23,1.23,0,0,0,.6-1.1A1,1,0,0,0,31,15.8h-1.6a6.57,6.57,0,0,0-1.2.6,5.2,5.2,0,0,0-.3.5l-6.7-.3v.3l6.5.6v.7l-1.4,1.5-6.8-.3s-.2-.6-1.2-.6-18-1.1-18-1.1-.4,0-.3.3a20.48,20.48,0,0,1,3.6,2.8,29.51,29.51,0,0,0,2.3,2.4Z"/>
                    </g>
                </g>
            </svg>
        </div>
    </div>

<?php
    require_once(__DIR__.'/layouts/bottom_layout.php');
?>

<script type="text/javascript" src="js/objects/accountPages/AccountPage.js"></script>
<script src="js/objects/accountPages/CreateAccount.js"></script>
<script>var createAccount = new CreateAccount();</script>