<?php
 $content = ''
 foreach($_POST as $key => $value){
    if($value) {
        $content .= "<b>$key</b>:<i>$value</i>\n"
    }
 }
 if(trim($content)){
    $content = "<b>Message from Site:</b>\n".$content
    // Your bot's token that from @BotFather
    $apiToken = '7708282736:AAFyLHMBS26rxrOzXoQ7RWqVOWFaL1syvaU'
    $data = [
        // The user's(that you want send a message) telegram chat id
        'chat_id' => 'CodeGetMessages',
        'text' => $content,
        'parse_mode' => 'HTML'
    ]
    $response = file_get_contents("https://api.telegram.org/bot$apiToken/sendMessage?".http_build_query($data))
 }
?>