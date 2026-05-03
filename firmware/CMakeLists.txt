# == DO NOT EDIT THE FOLLOWING LINES for the Raspberry Pi Pico VS Code Extension to work ==
if(WIN32)
    set(USERHOME $ENV{USERPROFILE})
else()
    set(USERHOME $ENV{HOME})
endif()
set(sdkVersion 2.2.0)
set(toolchainVersion 14_2_Rel1)
set(picotoolVersion 2.2.0-a4)
set(picoVscode ${USERHOME}/.pico-sdk/cmake/pico-vscode.cmake)
if (EXISTS ${picoVscode})
    include(${picoVscode})
endif()
# ====================================================================================
set(PICO_BOARD pico2 CACHE STRING "Board type")

cmake_minimum_required(VERSION 3.13)


include(pico_sdk_import.cmake)

project(usbtest_project)


pico_sdk_init()

add_executable(usbtest
	main.c
	usb_descriptors.c
	driver.c
	core1_task.c
)

target_include_directories(usbtest PRIVATE ${CMAKE_CURRENT_LIST_DIR})

target_link_libraries(usbtest PRIVATE pico_stdlib tinyusb_device tinyusb_board hardware_adc hardware_dma hardware_pwm pico_multicore)
pico_add_extra_outputs(usbtest)